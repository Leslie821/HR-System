import { Badge, Button, Container, Group, Modal, Table } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { boolean } from "zod";
import React from "react";
import { fetchServerDataNonGet, fetchServerData } from "../../../utilis/fetchDataUtilis";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";

const customStyles = {
  rows: {
    style: {
      fontSize: "15px",
      // font-family
    },
  },
  headCells: {
    style: {
      fontSize: "20px", // override the cell padding for data cells
    },
  },
};
const columns = [
  {
    name: "Dayoff Name",
    selector: (row: any) => row.type,
  },
  {
    name: "Short Form",
    selector: (row: any) => row.short_form,
  },
  {
    name: "One-time Dayoff",
    selector: (row: any) =>
      row.one_time_day_off ? (
        <Badge>true</Badge>
      ) : (
        <Badge color={"red"}>false</Badge>
      ),
  },
  {
    name: "Paid leave ?",
    selector: (row: any) =>
      row.pay_leave ? <Badge>true</Badge> : <Badge color={"red"}>false</Badge>,
  },
];

export function DayoffType() {
  let user = useSelector((state: IRootState) => state.user.user); //access_level_id
  //////   alll const starts here!!!  ///////////
  const [inpputtye, setinputtype] = useState({
    dayoff_name: "",
    short_form: "",
    one_time_day_off: "",
    pay_leave: "",
  });
  ///////first modal for ADD NEW LEAVE TYPE ////////////////
  const [opened, setOpened] = useState(false);
  ///////second modal for  DELECT item ////////////////
  const [openSecondModal, setOpenSecondModal] = useState(false);

  const [info, setInfo] = useState<any>({
    type: "",
    short_form: "",
    one_time_day_off: "",
    pay_leave: "",
  });
  // const [refresh, setRefresh] = useState(true);
  /////// select items /////////////////////////
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
  const handleRowSelected = React.useCallback(
    (state: { allSelected: any; selectedCount: any; selectedRows: any[] }) => {
      setSelectedRows(state.selectedRows);
    },
    []
  );
  // console.log("check type", selectedRows);

  //////   all const ends  here!!!  ///////////

  async function deleteSelectedType() {
    await fetchServerDataNonGet("/leave/deletedayofftype", "POST", selectedRows)
  }

  async function getType() {
    let res = await fetchServerData("/leave/getdayofftype")
    setInfo(res);
  }

  //////////////////get the type when the page is loaded /////////

  useEffect(() => {
    getType();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      {/* pop up box  Modal (add new item )starts here!!!!!!! */}
      <Modal size="auto" opened={opened} onClose={() => setOpened(false)}>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            // const form = event.target as HTMLFormElement
            // const formData = new FormData(form);
            // console.log(formData);

            await fetchServerDataNonGet("/leave/addDayofftype", "POST", inpputtye)
            setOpened(false);
            window.location.reload();
          }}
        >
          <div style={{ display: "flex", margin: "20px" }}>
            <div>
              <div style={{ margin: "0px 10px" }}>Dayoff Name</div>
              <br />
              <input
                required
                value={inpputtye.dayoff_name}
                onChange={(e) => {
                  setinputtype({
                    ...inpputtye,
                    dayoff_name: e.currentTarget.value,
                  });
                }}
                name="dayoff_name"
                id="dayoff_name"
                type="text"
                placeholder="Day off name"
                style={{ margin: "0px 10px" }}
              ></input>
            </div>
            <div>
              <div style={{ margin: "0px 10px" }}>Short Form</div>
              <br />
              <input
                required
                value={inpputtye.short_form}
                onChange={(e) => {
                  setinputtype({
                    ...inpputtye,
                    short_form: e.currentTarget.value,
                  });
                }}
                name="short_form"
                id="short_form"
                type="short_form"
                placeholder="short_form"
                style={{ margin: "0px 10px" }}
              ></input>
            </div>
          </div>
          <hr />
          <br></br>

          <div style={{ display: "flex", margin: "20px" }}>
            <div>
              <div style={{ margin: "0px 10px" }}>One Time Dayoff</div>
              <br></br>

              <select
                required
                style={{ margin: "0px 10px" }}
                value={inpputtye.one_time_day_off}
                onChange={(e) => {
                  setinputtype({
                    ...inpputtye,
                    one_time_day_off: e.currentTarget.value,
                  });
                }}
              >
                <option value="" disabled hidden>
                  Choose here
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <div style={{ margin: "0px 10px" }}>Paid Leave</div>
              <br></br>

              <select
                required
                style={{ margin: "0px 10px" }}
                value={inpputtye.pay_leave}
                onChange={(e) => {
                  setinputtype({
                    ...inpputtye,
                    pay_leave: e.currentTarget.value,
                  });
                }}
              >
                <option value="" disabled hidden>
                  Choose here
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div style={{ paddingLeft: "250px" }}>
            {/* <Button type="submit" onClick={() => { setRefresh(false) }}>
              Submit
            </Button> */}
            <Button type="submit">Submit</Button>
          </div>

          <br></br>
        </form>
      </Modal>
      {/* pop up box Modal(add new item) ends here!!!!!!! */}

      {/* pop up box Modal (delete item) starts here!!!  */}
      <Modal
        opened={openSecondModal}
        onClose={() => setOpenSecondModal(false)}
        title="Are you sure you want to delete following items? "
      >
        <hr></hr>
        {selectedRows.map((r) => (
          <div>{r.type}</div>
        ))}
        <br></br>
        <div style={{ paddingLeft: "300px" }}>
          <Button
            onClick={() => {
              deleteSelectedType();
            }}
          >
            Confirm
          </Button>
        </div>
      </Modal>
      {/* pop up box Modal (delete item) ends here!!!  */}

      {/***************** below is  buttons group  ---   */}
      <Group>
        <Group>
          <Button variant="light">
            <IconArrowNarrowLeft size={50} stroke={1.5} />
          </Button>
          <h2>Leave Type</h2>
          {user!.access_level_id <= 2 ?
            <Group position="center">
              <Button onClick={() => setOpened(true)}>Add New Leave Type</Button>
            </Group> : ""}

          {/* 
          <Group position="center">
            <Button onClick={() => setOpenSecondModal(true)}>Delete Leave Type</Button>
          </Group> */}
        </Group>
        {/************************* buttons group  ends here!!!   ************************ */}

        <DataTable
          customStyles={customStyles}
          columns={columns}
          data={info}
          // selectableRows
          highlightOnHover
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
        />
      </Group>
    </div>
  );
}
