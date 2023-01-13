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
  const [opened, setOpened] = useState(false);
  const [info, setInfo] = useState<any>([
    {
      dayoff_name: "Annual Leave",
      short_form: "AL",
      one_time_dayoff: "Yes",
      paid_leave: "Yes",
    },
  ]);
  async function getType() {
    let res = await fetch("/getType", {
      method: "Get",
    });
    const result = await res.json();
    setInfo(result);
  }

  useEffect(() => {
    getType();
  }, []);

  const formData = new FormData();

  formData.append("dayoff_name", info.dayoff_name);
  formData.append("short_form", info.short_form);

  formData.append("one_time_dayoff", info.one_time_dayoff);

  formData.append("paid_leave", info.paid_leave);

  return (
    <div>
      <Modal size="auto" opened={opened} onClose={() => setOpened(false)}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            fetch("applyDayoff", {
              method: "Post",
              body: formData,
            });
          }}
        >
          <div style={{ display: "flex", margin: "20px" }}>
            <div>
              <div style={{ margin: "0px 10px" }}>Dayoff Name</div>
              <br />
              <input
                value={info.dayoff_name}
                onChange={(e) => {
                  setInfo({ ...info, dayoff_name: e.currentTarget.value });
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
                value={info.short_form}
                onChange={(e) => {
                  setInfo({ ...info, short_form: e.currentTarget.value });
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
              <input
                value={info.one_time_dayoff}
                onChange={(e) => {
                  setInfo({ ...info, one_time_dayoff: e.currentTarget.value });
                }}
                name="one_time_dayoff"
                id="one_time_dayoff"
                placeholder="one_time_dayoff"
                type="one_time_dayoff"
                style={{ margin: "0px 10px" }}
              ></input>
            </div>

            <div>
              <div style={{ margin: "0px 10px" }}>Paid Leave</div>
              <br></br>
              <input
                value={info.paid_leave}
                onChange={(e) => {
                  setInfo({ ...info, paid_leave: e.currentTarget.value });
                }}
                name="paid_leave"
                id="paid_leave"
                placeholder="paid leave"
                type="paid_leave"
                style={{ margin: "0px 10px" }}
              ></input>
            </div>
          </div>

          <div style={{ paddingLeft: "250px" }}>
            <Button type="submit" onClick={() => {}}>
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
