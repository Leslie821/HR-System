import { useEffect, useRef, useState } from "react";

import { Button, Group, Input, Modal, Table, TextInput, Textarea, createStyles } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons";
import DataTable from "react-data-table-component";
import React from "react";
import { fetchServerData, fetchServerDataForm, fetchServerDataNonGet } from "../../../utilis/fetchDataUtilis";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";

// TRUNCATE dayoff_type  RESTART IDENTITY;/////  ****************

type Dayoff = {
  id?: string;
};
const useStyleTable = createStyles((theme) => ({
  body: {
    marginLeft: 40,
    display: "block",
  },
  header: {
    height: 50,
    maxHeight: 50,
    width: "100%",
    marginTop: 25,
    paddingBottom: 75,
    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  },
  table: {
    maxWidth: 1800,
    width: "100%",
    marginTop: 25,
    display: "flex",
    alignItems: "top",
    justifyContent: "end",
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.md,
  },
  button: {
    marginBottom: 8,
  },
}));
export function DayoffPending() {
  const { classes } = useStyleTable();
  let user = useSelector((state: IRootState) => state.user.user); //access_level_id
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


    getAll(user!.id);
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

  async function getAll(userID: number) {
    let resultfromdb: any = await fetchServerDataNonGet("/leave/getapplicationstatus", "POST", { id: userID });
    // let  = await res.json();
    // console.log(resultfromdb);

    setResult(resultfromdb);
  }
  async function getPending(userID: number) {
    let info: any = await fetchServerDataNonGet("/leave/getpendingApplication", "POST", { id: userID });
    // info = await res.json();

    setResult(info);

  }
  async function getApproved(userID: number) {
    let info: any = await fetchServerDataNonGet("/leave/getApprovedApplication", "POST", { id: userID });
    // info = await res.json();
    setResult(info);
  }
  async function approveItems() {
    await fetchServerDataNonGet("/leave/updateapplication", "POST", selectedRows);
    location.reload()
  }

  async function rejectitems() {
    await fetchServerDataNonGet("/leave/reject", "POST", { rejectItem: rejectItem, reject: reject });
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

      selector: (row: any) => (row.status == "pending" && user!.access_level_id <= 2 && <Button color="red" onClick={() => {
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
    <Group className={classes.body}>
      <div className={classes.header}>
        <Group>
          <h2>Leave Type</h2>
        </Group>
      </div>

      <Group className={classes.table}>

        <div>
          <div style={{ display: "flex" }}>

            {/* *********Button filter to show all pending cases************ */}

            <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
              <Button
                onClick={() => {
                  getPending(user!.id);
                }}
              >
                Show Pending Application
              </Button>
            </div>
            {/* *********Button filter to show all cases************ */}

            <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
              <Button
                onClick={() => {
                  getAll(user!.id)
                }}
              >
                Show All Application
              </Button>
            </div>
            {/* *******Button filter to show all approved cases ************** */}

            <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
              <Button
                onClick={() => {
                  getApproved(user!.id);
                }}
              >
                Show Approved Application
              </Button>
            </div>

            {/* ********Button To Approve application ************* */}
            {user!.access_level_id <= 2 ? <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
              <Button
                onClick={() => {
                  approveItems();
                }}
              >
                Approve Selected Case
              </Button>
            </div> : ""}


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




      {/* /////////////////search function in Modal , show staff dayoff condition //////////////////////////////////////// */}

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title=""
      >
        <div>
          {/* <div>{[searchresult]}</div> */}
          {Array.isArray(searchresult) && searchresult.length >= 1 ? (
            <>
              <div>Fixed Annual Leave: {searchresult[0].annual_leave_fixed ? searchresult[0].annual_leave_fixe : "N/A"}</div>
              <br></br>
              <div>Fixed Sick Leave: {searchresult[0].sick_leave_fixed}</div>
            </>
          ) : ""}
          <br></br>
        </div>
        {user!.access_level_id <= 2 ? <Input
          placeholder="Search me"
          type="text"
          value={query}
          onChange={(e: any) => {
            setQuery(e.target.value)
          }}
        ></Input> : <Input
          placeholder="Search me"
          type="text"
          value={user?.name}
          onKeyDown={(e: any) => {
            setQuery(e.target.value)
          }}
          tabIndex={0}

        ></Input>}

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
    </Group>
  );
  // rejectitems(rejectItem)
}
