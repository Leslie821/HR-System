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


export function ShowClaimFormStatus() {
  const [selectedRows, setSelectedRows] = React.useState<Dayoff[]>([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [result, setResult] = useState<any>();  
  const [query, setQuery] = useState<string>("")
  const [togglesearch, settoggleSearch] = useState<boolean>(true)
  const [searchresult, setSearchresult] = useState<any>()
  const [openedSecondModal, setOpenedSecondModal] = useState(false);

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
    
    let res = await fetchServerData("/claim-form/allClaimForms");

    console.log("GETALL", res);
    

    setResult(res);
  }
  /////////////////below is accept /////////////////

  const fetchdata = async () => {
    try {
    
      let res = await fetchServerData("/claim-form/allClaimForms");
      console.log("GETALL", res);
    
  
      setResult(res);
    } catch (error) {
      console.log(error)
    }
  }

    async function setRejectItem(id: string | number){
      await fetchServerDataNonGet("/claim-form/reject","PATCH",{id:id})
      await fetchdata()
    }

    async function setAcceptedItem(id: string | number){
      await fetchServerDataNonGet("/claim-form/accept","PATCH",{id:id})
      await fetchdata()
    }
  

  ///////////-----------------toggle search ends  here  -------/////////////////
  const columns = [
    {

      maxWidth: "1px",
      name: "id",
      selector: (row: any) => row.id,

    },
    {

      maxWidth: "1px",
      name: "pic",
      selector: (row: any) => <img src={import.meta.env.VITE_SERVER_API + "/" + row.pic } width="50px"/>,

    },
    {

      maxWidth: "1px",
      name: "Name",
      selector: (row: any) => row.user_name,

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
            />
          </Group>
        </div>
      </div>



    </div>
  );
  // rejectitems(rejectItem)
}