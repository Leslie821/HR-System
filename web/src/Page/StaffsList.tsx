import { ClassNames } from "@emotion/react";
import { Checkbox, createStyles, Group, Text } from "@mantine/core";
import { information } from "../App";
import { NavbarNested } from "../components/sideBar/SideBar2";
// import { useState } from "react";

interface Props {
  data: information[];
}

const useStyleTable = createStyles((theme) => ({
  table: {
    display: "flex",
    alignItems: "center",
    margin: "auto",
    width: "71vw",
    height: "100vh",
    padding: "50px",
  },
  header: {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: 5,
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
        <Group spacing="md">
          <Checkbox></Checkbox>
          <Text> {items.id}</Text>
          <Text> {items.name}</Text>
          <Text> {items.department}</Text>
          <Text> {items.jobTitle}</Text>
          <Text> {items.email}</Text>
          <Text> {items.employDate}</Text>
          <Text> {items.status}</Text>
        </Group>
      </th>
    </tr>
  ));
  return (
    <Group className={classes.table}>
      <div>
        <thead className={classes.header}>
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
      </div>
    </Group>
  );
}

export default StaffsList;
