import { useEffect, useState } from "react";

import { Button, Group, Input, Modal, Table, TextInput } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons";
import DataTable from "react-data-table-component";
import React from "react";

// TRUNCATE dayoff_type  RESTART IDENTITY;/////  ****************

type Dayoff = {
  id?: string;
};

export function DayoffPending() {
  const [selectedRows, setSelectedRows] = React.useState<Dayoff[]>([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [result, setResult] = useState<any>();
  const [opened, setOpened] = useState(false);
  const [query, setQuery] = useState<string>("")
  const [togglesearch, settoggleSearch] = useState<boolean>(true)
  const [searchresult, setSearchresult] = useState<any>()




  useEffect(() => {
    getAll();
  }, []);

  const handleRowSelected = React.useCallback(
    (state: { selectedRows: any }) => {
      setSelectedRows(state.selectedRows);
    },
    []
  );

  const rowDisabledCriteria = (row: any) => row.status == "approved" || row.status == "rejected";

  async function getAll() {
    let res: any = await fetch(
      "http://localhost:3000/leave/getapplicationstatus"
    );
    let resultfromdb = await res.json();
    // console.log(resultfromdb);

    setResult(resultfromdb);
  }
  async function getPending() {
    let res: any = await fetch("/pending"),
      info = await res.json();
  }
  async function getApproved() {
    let res: any = await fetch("/approved"),
      info = await res.json();
  }
  async function approveItems() {
    await fetch("http://localhost:3000/leave/updateapplication", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedRows),
    });
  }
  /////////////////below toggle search/////////////////

  useEffect(() => {
    if (togglesearch) {
      settoggleSearch(false)
      return
    }
    fetchdata()
  }, [query])


  const fetchdata = async () => {
    try {
      const res = await fetch(`http://localhost:3000/leave/getstaffalsl` + `?qq=${query}`, {

      })
      // console.log("result from db about staff", res);

      const data = await res.json()

      setSearchresult(data)


    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    {
      name: "ID",
      selector: (row: any) => row.id,

    },
    {
      name: "StaffID",
      selector: (row: any) => row.staff_id,

    },
    {
      name: "Name",
      selector: (row: any) => row.name,
    },
    {
      name: "Dayoff Type",
      selector: (row: any) => row.type,
    },
    {
      name: "From",
      selector: (row: any) => row.start_date,
    },
    {
      name: "Day Length",
      selector: (row: any) => row.total_date,
    },
    {
      name: "Application Date",
      selector: (row: any) => row.created_at,
    },
    {
      name: "Approved By",
      selector: (row: any) => row.staff_id,
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
    },
    {
      name: "Reason",
      selector: (row: any) => row.remark,
    },
  ];

  // ////////////////show staff al sl ///////////////////////////
  const al_sl_columns = [
    {
      name: 'Staff Name',
      selector: (row: any) => row.name,

    },
    {
      name: 'Dayoff Type',
      selector: (row: any) => row.dayoff_type,

    },
    {
      name: 'Used ',
      selector: (row: any) => row.dayoff_count,

    },
  ];

  return (
    <div>
      <div>
        <div>
          <Group>
            <Group>
              <Button variant="light">
                <IconArrowNarrowLeft size={50} stroke={1.5} />
              </Button>

              <h2>Leave Type</h2>
            </Group>
            <div>
              <div
                style={{ display: "flex", margin: "0px 50px", padding: "30px" }}
              >
                {/* ********************* */}

                <div>
                  <Button
                    onClick={() => {
                      getPending();
                    }}
                  >
                    Show Pending Application
                  </Button>
                </div>
                {/* ********************* */}

                <div>
                  <Button
                    onClick={() => {
                      getApproved();
                    }}
                  >
                    Show Approved Application
                  </Button>
                </div>

                {/* ********************* */}

                <div>
                  <Button
                    onClick={() => {
                      approveItems();
                    }}
                  >
                    Approve Selected Case
                  </Button>
                </div>
                <div>
                  <Group >
                    <Button onClick={() => setOpened(true)}>Show Stafff AL SL remain</Button>
                  </Group>
                </div>
              </div>
            </div>
            <DataTable
              columns={columns}
              data={result}
              // contextActions={contextActions}
              selectableRows
              selectableRowDisabled={rowDisabledCriteria}
              onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={toggleCleared}
            />
          </Group>
        </div>
      </div>


      {/* /////////////////show staff  al  sl //////////////////////////////////////// */}

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title=""
      >
        <Input
          placeholder="Search me"
          type="text"
          value={query}
          onChange={(e: any) => {
            setQuery(e.target.value);
          }}
        ></Input>
        <DataTable columns={al_sl_columns} data={searchresult} />
      </Modal>
    </div>
  );
}
