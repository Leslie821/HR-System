import { useEffect, useRef, useState } from "react";
import { fetchServerData, fetchServerDataNonGet } from '../../../utilis/fetchDataUtilis';
import { Button, Group, Input, Modal, Table, TextInput, Textarea } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons";
import DataTable from "react-data-table-component";
import React from "react";

// TRUNCATE dayoff_type  RESTART IDENTITY;/////  ****************

type Dayoff = {
  id?: string;
};


export function ShowClaimFormPending() {
  const [selectedRows, setSelectedRows] = React.useState<Dayoff[]>([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [result, setResult] = useState<any>();  
  const [query, setQuery] = useState<string>("")
  const [togglesearch, settoggleSearch] = useState<boolean>(true)
  const [searchresult, setSearchresult] = useState<any>()
  const [accept, setAccpectedItem] = useState<any>();
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
    console.log("123");
    
    let res = await fetchServerData("/claim-form/allClaimForms");

    setResult(res);
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
      const res = await fetch(`http://localhost:3000/leave/getstaffalsl` + `?qq=${query}`, {

      })
      // console.log("result from db about staff", res);

      const data = await res.json()
      console.log("data from DB ", res);

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
    // {

    //   maxWidth: "1px",
    //   name: "Name",
    //   selector: (row: any) => row.name,
    // },
    {

      maxWidth: "1px",
      name: "Type",
      selector: (row: any) => row.type,
    },
    {

      maxWidth: "1px",
      name: "Date",
      selector: (row: any) => row.date,
    },
    {

      maxWidth: "1px",
      name: "remark",
      selector: (row: any) => row.remark,
    },
    {

      maxWidth: "1px",
      name: "Status",
      selector: (row: any) => row.status,
    },
    {

      maxWidth: "1px",
      name: "",

      selector: (row: any) => (row.status == "pending" && <Button color="red" onClick={() => {
        setOpenedSecondModal(true); setRejectItem(row.id);
      }}>Reject</Button>),
    },
    {

      maxWidth: "1px",
      name: "",

      selector: (row: any) => (row.status == "pending" && <Button color="red" onClick={() => {
       setAccpectedItem(row.id);
      }}>accept</Button>),
    }
  ];



  return (
    <div>
      <div>
        <div>
          <Group>
          

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



    </div>
  );
  // rejectitems(rejectItem)
}
