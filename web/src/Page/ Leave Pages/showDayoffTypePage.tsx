import { Button, Container, Group, Modal, Table } from "@mantine/core";
import { useStyleTable } from "../Staff Pages/StaffsList";
import { IconArrowNarrowLeft } from "@tabler/icons";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
// import { useStyleTable } from "./Page/StaffsList";

const columns = [
  {
    name: "Dayoff Name",
    selector: (row: any) => row.dayoff_name,
  },
  {
    name: "Short Form",
    selector: (row: any) => row.short_form,
  },
  {
    name: "One-time Dayoff",
    selector: (row: any) => row.one_time_dayoff,
  },
  {
    name: "Paid leave ?",
    selector: (row: any) => row.paid_leave,
  },
];

export function DayoffType() {
  const [inpputtye, setinputtype] = useState(
    {
      dayoff_name: "",
      short_form: "",
      one_time_dayoff: "",
      paid_leave: "",
    },
  )
  const [opened, setOpened] = useState(false);
  const [info, setInfo] = useState<any>(
    {
      dayoff_name: "",
      short_form: "",
      one_time_dayoff: "",
      paid_leave: "",
    },
  );
  const [refresh, setRefresh] = useState(true)
  async function getType() {
    let res = await fetch("http://localhost:3000/leave/getdayofftype", {
      method: "Get",
    });
    const result = await res.json();
    setInfo(result);
  }
  /////does the page reload ? /////////////
  useEffect(() => {
    if (refresh == false) {
      console.log("does it reload?");

      window.location.reload()
      setRefresh(true)
    }
  }, [refresh])


  //////////////////get the type when the page is loaded /////////

  useEffect(() => {
    getType();
  }, []);




  return (
    <div>
      <Modal size="auto" opened={opened} onClose={() => setOpened(false)}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            // const form = event.target as HTMLFormElement
            // const formData = new FormData(form);
            // console.log(formData);


            fetch("http://localhost:3000/leave/applyDayoff", {
              method: "Post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(inpputtye),
            });
          }}
        >
          <div style={{ display: "flex", margin: "20px" }}>
            <div>
              <div style={{ margin: "0px 10px" }}>Dayoff Name</div>
              <br />
              <input
                value={inpputtye.dayoff_name}
                onChange={(e) => {
                  setinputtype({ ...inpputtye, dayoff_name: e.currentTarget.value });
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
                value={inpputtye.short_form}
                onChange={(e) => {
                  setinputtype({ ...inpputtye, short_form: e.currentTarget.value });
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


              <select style={{ margin: "0px 10px" }} value={inpputtye.one_time_dayoff} onChange={(e) => {
                setinputtype({ ...inpputtye, one_time_dayoff: e.currentTarget.value });
              }}>
                <option value="" selected disabled hidden>Choose here</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>


            </div>

            <div>
              <div style={{ margin: "0px 10px" }}>Paid Leave</div>
              <br></br>


              <select style={{ margin: "0px 10px" }} value={inpputtye.paid_leave} onChange={(e) => {
                setinputtype({ ...inpputtye, paid_leave: e.currentTarget.value });
              }}>
                <option value="" selected disabled hidden>Choose here</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div style={{ paddingLeft: "250px" }}>
            <Button type="submit" onClick={() => { setRefresh(false) }}>
              Submit
            </Button>
          </div>

          <br></br>
        </form>
      </Modal>

      <Group>
        <Group>
          <Button variant="light">
            <IconArrowNarrowLeft size={50} stroke={1.5} />
          </Button>

          <h2>Leave Type</h2>
          <Group position="center">
            <Button onClick={() => setOpened(true)}>Add New Leave Type</Button>
          </Group>
        </Group>

        <DataTable columns={columns} data={info} />
        {/* <Table striped withColumnBorders verticalSpacing="md">
      selectableRows
        <thead>{header}</thead>
        <tbody>{info}</tbody>
      </Table> */}
      </Group>
    </div>
  );
}
