import { useState } from "react";

import { Button, Group, Table } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons";
import DataTable from "react-data-table-component";
import React from "react";

type Dayoff = {
  id?: string;
};

export function DayoffPending() {
  const [selectedRows, setSelectedRows] = React.useState<Dayoff[]>([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState();

  const handleRowSelected = React.useCallback(
    (state: { selectedRows: any }) => {
      setSelectedRows(state.selectedRows);
    },
    []
  );

  // console.log(selectedRows[0]);

  const rowDisabledCriteria = (row: any) =>
    row.status == "Approved" || row.status == "Rejected";

  /////////////////////////////////select row/////
  let info = [
    {
      id: "1",
      staffid: "5",
      name: "Alice",
      day_off_type: "SL",
      from: "2022 - 11 - 10",
      to: "2022 - 11 - 15",
      day_off_length: 6,
      application_date: "2022-11-19",
      approved_by: "Tony",
      status: "Pending",
      reason: "gdfgdfgdfgdfgdfgrdfgerg",
    },
    {
      id: "2",
      staffid: "100",
      name: "Alice",
      day_off_type: "SL",
      from: "2022 - 11 - 10",
      to: "2022 - 11 - 15",
      day_off_length: 6,
      application_date: "2022-11-19",
      approved_by: "Tony",
      status: "Pending",
      reason: "gdfgdfgdfgdfgdfgrdfgerg",
    },
    {
      id: "3",
      staffid: "100",
      name: "Alice",
      day_off_type: "SL",
      from: "2022 - 11 - 10",
      to: "2022 - 11 - 15",
      day_off_length: 6,
      application_date: "2022-11-19",
      approved_by: "Tony",
      status: "Rejected",
      reason: "gdfgdfgdfgdfgdfgrdfgerg",
    },
  ];

  async function getAll() {
    let res: any = await fetch("/all");
    info = await res.json();
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
    let res: any = await fetch("/approve", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedRows),
    });
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
      selector: (row: any) => row.day_off_type,
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
      selector: (row: any) => row.day_off_length,
    },
    {
      name: "Application Date",
      selector: (row: any) => row.application_date,
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
              <div
                style={{ display: "flex", margin: "0px 50px", padding: "30px" }}
              >
                <div>
                  <button
                    onClick={() => {
                      getAll();
                    }}
                  >
                    Show all Application
                  </button>
                </div>
                {/* ********************* */}

                <div>
                  <button
                    onClick={() => {
                      getPending();
                    }}
                  >
                    Show Pending Application
                  </button>
                </div>
                {/* ********************* */}

                <div>
                  <button
                    onClick={() => {
                      getApproved();
                    }}
                  >
                    Show Approved Application
                  </button>
                </div>

                {/* ********************* */}

                <div>
                  <button
                    onClick={() => {
                      approveItems();
                    }}
                  >
                    Approve Selected Case
                  </button>
                </div>
              </div>
            </div>
            <DataTable
              columns={columns}
              data={info}
              // contextActions={contextActions}
              selectableRows
              selectableRowDisabled={rowDisabledCriteria}
              onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={toggleCleared}
            />

            {/* <Table striped withColumnBorders verticalSpacing="md">
      selectableRows
        <thead>{header}</thead>
        <tbody>{info}</tbody>
      </Table> */}
          </Group>
        </div>
      </div>

      <br></br>
      <br></br>

      <h4>
        filter DB login :await
        this.knex.select("column").from("staff_dayoff_table").where("id","=",1
        && "dayofftyle","=","AL" )
      </h4>
      <br></br>
    </div>
  );
}
