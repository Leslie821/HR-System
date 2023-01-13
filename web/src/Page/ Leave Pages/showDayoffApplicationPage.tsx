import { useEffect, useState } from "react";


import { Button, Group, Table } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons";
import DataTable from "react-data-table-component";
import React from "react";

type Dayoff = {
  id?: string
}

export function DayoffPending() {

  const [selectedRows, setSelectedRows] = React.useState<Dayoff[]>([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [result, setResult] = useState<any>();

  useEffect(() => { getAll() }, [])

  const handleRowSelected = React.useCallback((state: { selectedRows: any; }) => {

    setSelectedRows(state.selectedRows);


  }, []);




  const rowDisabledCriteria = (row: any) => row.status == "Approved" || row.status == "Rejected";



  async function getAll() {
    let res: any = await fetch("http://localhost:3000/leave/getapplicationstatus");
    let resultfromdb = await res.json()
    console.log(resultfromdb);

    setResult(resultfromdb)
  }
  async function getPending() {
    let res: any = await fetch("/pending"),
      info = await res.json()
  }
  async function getApproved() {
    let res: any = await fetch("/approved"),
      info = await res.json()
  }
  async function approveItems() {
    await fetch("http://localhost:3000/leave/updateapplication", {
      method: "Post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedRows[0])

    }
    )
  }



  const columns = [
    {
      name: "ID",
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: "StaffID",
      selector: (row: any) => row.staffid,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: any) => row.name,
    },
    {
      name: "Dayoff Type",
      selector: (row: any) => row.dayoff_type,
    },
    {
      name: "From",
      selector: (row: any) => row.from,
    },
    {
      name: "To",
      selector: (row: any) => row.to,
    },
    {
      name: "Day Length",
      selector: (row: any) => row.day_length,
    },
    {
      name: "Application Date",
      selector: (row: any) => row.created_at,
    },
    {
      name: "Approved By",
      selector: (row: any) => row.approved_by,
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
    },
    {
      name: "Reason",
      selector: (row: any) => row.reason,
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
              <div style={{ display: "flex", margin: "0px 50px", padding: "30px" }}>





                {/* ********************* */}

                <div>
                  <button
                    onClick={() => {
                      getPending();
                    }}>Show Pending Application</button>
                </div>
                {/* ********************* */}

                <div>
                  <button
                    onClick={() => {
                      getApproved();
                    }}>Show Approved Application</button>
                </div>

                {/* ********************* */}

                <div>
                  <button onClick={() => {
                    approveItems();
                  }}>
                    Approve Selected Case
                  </button>
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



      <br></br>
    </div>
  );
}


