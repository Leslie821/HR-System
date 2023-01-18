import { useState } from "react";

import { Button, Container, Group, Table } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "ID",
    selector: (row: any) => row.id,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row: any) => row.name,
  },
  {
    name: "Remainder",
    selector: (row: any) => row.remain,
  },
  {
    name: "Fixed Amount",
    selector: (row: any) => row.fixed_amount,
  },

  {
    name: "Employee Type",
    selector: (row: any) => row.employee_type,
  },
];

export function Dayofflist() {
  const [info, setInfo] = useState([
    // {
    //   id: "100",
    //   name: "Alice",
    //   remain: "6",
    //   fixed_amount: "10",
    //   employee_type: "fulltime",
    // },
    // {
    //   id: "39",
    //   name: "Bob",
    //   remain: "3",
    //   fixed_amount: "10",
    //   employee_type: "fulltime",
    // },
  ]);


  async function getAL() {
    let res: any = await fetch("/al");
    let data = await res.json();
    setInfo(data);
  }
  async function getSL() {
    let res: any = await fetch("/sl", {});
    let data = await res.json();
    setInfo(data);
  }
  async function getBL() {
    let res: any = await fetch("/bl", {
      method: "Get",
    });
    let data = await res.json();
    setInfo(data);
  }

  return (
    <div>
      <div style={{ padding: "0px 30px" }}>
        <div>
          <Group>
            <Group>
              <Button variant="light">
                <IconArrowNarrowLeft size={18} stroke={1.5} />
              </Button>

              <h2>Leave Balance</h2>
            </Group>
            <div
              style={{ display: "flex", margin: "0px 50px", padding: "30px" }}
            >
              <div style={{ padding: "30px" }}> Filter</div>
              <div
                style={{ padding: "30px" }}
                onClick={() => {
                  getAL();
                }}
              >
                <button> Show AL </button>
              </div>
              <div
                style={{ padding: "30px" }}
                onClick={() => {
                  getSL();
                }}
              >
                <button>Show SL</button>
              </div>
              <div
                style={{ padding: "30px" }}
                onClick={() => {
                  getBL();
                }}
              >
                <button>Show BL</button>
              </div>
            </div>

            <DataTable columns={columns} data={info} />

          </Group>
        </div>

        <br></br>
      </div>
    </div>
  );
}

