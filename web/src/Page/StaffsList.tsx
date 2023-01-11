import { ClassNames } from "@emotion/react";
import { Checkbox, createStyles, Group, Text } from "@mantine/core";
import { information } from "../App";
import { NavbarNested } from "../components/sideBar/SideBar2";
// import { useState } from "react";

interface Props {
  data: information[];
}

export const useStyleTable = createStyles((theme) => ({
  body: {
    // display: "flex",
    // alignItems: "center",
    // margin: "auto",
    // width: "71vw",
    height: "80vh",
    // padding: "50px",
    // border: "1px solid",
  },
  header: {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: 5,
    border: "1px solid",
  },
  table: {
    border: "1px solid",
  },
}));

const info2 = [
  {
    id: 1,
    name: "Leslie",
    department: "IT",
    jobTitle: "IT",
    email: "leslie@Gmail.com",
    employDate: "2014-01-01",
    status: "active",
  },
  {
    id: 1,
    name: "Leslie",
    department: "IT",
    jobTitle: "IT",
    email: "leslie@Gmail.com",
    employDate: "2014-01-01",
    status: "active",
  },
  {
    id: 1,
    name: "Leslie",
    department: "IT",
    jobTitle: "IT",
    email: "leslie@Gmail.com",
    employDate: "2014-01-01",
    status: "active",
  },
];

export function StaffsList(props: Props) {
  const { classes } = useStyleTable();
  const info = info2.map((items) => (
    <tr key={items.name}>
      <th>
        {" "}
        <Checkbox></Checkbox>
      </th>
      <th> {items.id}</th>
      <th> {items.name}</th>
      <th> {items.department}</th>
      <th> {items.jobTitle}</th>
      <th> {items.email}</th>
      <th> {items.employDate}</th>
      <th> {items.status}</th>
    </tr>
  ));
  return (
    <Group className={classes.body}>
      <div>
        <table>
          {/* <thead className={classes.header}> */}
          <thead>
            <tr>
              <th></th>
              <th> ID</th>
              <th> Name</th>
              <th> Department</th>
              <th> Job Title</th>
              <th> Email</th>
              <th> Employ Date</th>
              <th> Status</th>
            </tr>
          </thead>

          <tbody>{info}</tbody>
        </table>
      </div>
    </Group>
  );
}

export default StaffsList;
