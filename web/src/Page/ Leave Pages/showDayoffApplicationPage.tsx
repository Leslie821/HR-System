import { useEffect, useRef, useState } from "react";

import { Button, Group, Input, Modal, Table, TextInput, Textarea } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons";
import DataTable from "react-data-table-component";
import React from "react";
import { fetchServerData, fetchServerDataForm, fetchServerDataNonGet } from "../../../utilis/fetchDataUtilis";

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

  const [openedSecondModal, setOpenedSecondModal] = useState(false);
  const [rejectItem, setRejectItem] = useState<any>()
  const [reject, setReject] = useState<any>("");


  const customStyles = {
    headCells: {
      style: {

        fontSize: "15px",
        marginRight: "0px",
        marginLeft: "0px",
        paddingLeft: "0px",
        paddingRight: "0px",
        width: "5px"
      },
    },
    cells: {
      style: {

        fontSize: "15px",
        marginRight: "0px",
        marginLeft: "0px",
        paddingLeft: "0px",
        paddingRight: "0px",
        width: "fit-content"
      },
    }
  }


  useEffect(() => {
    getAll();
  }, []);
  ////// table check box   select items ///////////////////////////
  const handleRowSelected = React.useCallback(
    (state: { selectedRows: any }) => {
      setSelectedRows(state.selectedRows);
    },
    []
  );
  // /////// if status  == approved  || rejected  , item cannot be selected ///////
  const rowDisabledCriteria = (row: any) => row.status == "approved" || row.status == "rejected";

  async function getAll() {
    let resultfromdb: any = await fetchServerData("/leave/getapplicationstatus");
    // let  = await res.json();
    // console.log(resultfromdb);

    setResult(resultfromdb);
  }
  async function getPending() {
    let info: any = await fetchServerData("/leave/getpendingApplication");
    // info = await res.json();

    setResult(info);

  }
  async function getApproved() {
    let info: any = await fetchServerData("/leave/getApprovedApplication");
    // info = await res.json();
    setResult(info);
  }
  async function approveItems() {
    await fetchServerDataNonGet("/leave/updateapplication", "POST", selectedRows);
    location.reload()
  }

  async function rejectitems() {


    await fetchServerDataNonGet("/leave/reject", "POST", { rejectItem, reject });

    location.reload()
  }
  /////////////////below is toggle search/////////////////

  useEffect(() => {
    if (togglesearch) {
      settoggleSearch(false)
      return
    }
    fetchdata()
  }, [query])


  const fetchdata = async () => {
    try {
      const data = await fetchServerData(`/leave/getstaffalsl` + `?qq=${query}`)
      // console.log("result from db about staff", res);

      // const data = await res.json()
      // console.log("data from DB ", data);

      setSearchresult(data)


    } catch (error) {
      console.log(error)
    }
  }
  ///////////-----------------toggle search ends  here  -------/////////////////
  const columns = [
    {

      maxWidth: "1px",
      name: "ID",
      selector: (row: any) => row.id,

    },
    {

      maxWidth: "1px",
      name: "StaffID",
      selector: (row: any) => row.staff_id,

    },
    {

      maxWidth: "1px",
      name: "Name",
      selector: (row: any) => row.name,
    },
    {

      maxWidth: "1px",
      name: "Dayoff Type",
      selector: (row: any) => row.type,
    },
    {

      maxWidth: "1px",
      name: "From",
      selector: (row: any) => row.date_format,
    },
    {

      maxWidth: "1px",
      name: "Day Length",
      selector: (row: any) => row.total_date,
    },
    {

      maxWidth: "1px",
      name: "Application Date",
      selector: (row: any) => row.date_format,
    },
    {

      maxWidth: "1px",
      name: "Approved By",
      selector: (row: any) => row.staff_id,
    },
    {

      maxWidth: "1px",
      name: "Status",
      selector: (row: any) => row.status,
    },
    {

      maxWidth: "1px",
      name: "Reject Reason",
      selector: (row: any) => row.remark,
    },
    {

      maxWidth: "1px",
      name: "",

      selector: (row: any) => (row.status == "pending" && <Button color="red" onClick={() => {
        setOpenedSecondModal(true); setRejectItem(row.id);
      }}>Reject</Button>),
    }
  ];


  // ////////////////show staff al sl  inside modal ///////////////////////////
  const al_sl_columns = [
    {
      name: 'Staff Name',
      selector: (row: any) => row.name,

    },
    {
      name: 'Dayoff Type',
      selector: (row: any) => row.type,

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
              <div style={{ display: "flex", margin: "0px 50px", paddingLeft: "0px", paddingRight: "30px" }}>

                {/* *********Button filter to show all pending cases************ */}

                <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                  <Button
                    onClick={() => {
                      getPending();
                    }}
                  >
                    Show Pending Application
                  </Button>
                </div>
                {/* *********Button filter to show all cases************ */}

                <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                  <Button
                    onClick={() => {
                      getAll()
                    }}
                  >
                    Show All Application
                  </Button>
                </div>
                {/* *******Button filter to show all approved cases ************** */}

                <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                  <Button
                    onClick={() => {
                      getApproved();
                    }}
                  >
                    Show Approved Application
                  </Button>
                </div>

                {/* ********Button To Approve application ************* */}

                <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                  <Button
                    onClick={() => {
                      approveItems();
                    }}
                  >
                    Approve Selected Case
                  </Button>
                </div>

                {/* ********Button Show Staff Dayoff Remain ************* */}
                <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                  <Group >
                    <Button onClick={() => setOpened(true)}>Show Staff Dayoff Remain</Button>
                  </Group>
                </div>
                {/* ********************* */}
              </div>
            </div>
            <DataTable
              columns={columns}
              data={result}
              // contextActions={contextActions}
              customStyles={customStyles}
              selectableRows
              selectableRowDisabled={rowDisabledCriteria}
              onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={toggleCleared}
            />
          </Group>
        </div>
      </div>


      {/* /////////////////search function in Modal , show staff dayoff condition //////////////////////////////////////// */}

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title=""
      >
        <div>
          {/* <div>{[searchresult]}</div> */}
          {searchresult ? (
            <>
              <div>Fixed Annual Leave: {searchresult[0].annual_leave_fixed}</div>
              <br></br>
              <div>Fixed Sick Leave: {searchresult[0].sick_leave_fixed}</div>
            </>
          ) : ""}
          <br></br>
        </div>
        <Input
          placeholder="Search me"
          type="text"
          value={query}
          onChange={(e: any) => {
            setQuery(e.target.value);
          }}
        ></Input>
        <DataTable columns={al_sl_columns} data={searchresult} customStyles={customStyles} />
      </Modal>


      {/***************** Second Modal (confirm delection of items)  *****************************************************/}
      <Modal
        size="auto"
        opened={openedSecondModal}
        onClose={() => setOpenedSecondModal(false)}
        title="Please Confirm Again"
      >
        <div>The selected item ID:{rejectItem}</div>
        <hr></hr>
        <Textarea
          value={reject}
          placeholder="Reject reason"
          onChange={(e: any) => {
            setReject(e.target.value);
          }}
          withAsterisk
        />
        <br></br>
        {<Button color="red" style={{ marginLeft: "100px", marginRight: "0px" }} onClick={() => {
          rejectitems();
        }}>Reject</Button>}


      </Modal>
    </div>
  );
  // rejectitems(rejectItem)
}
