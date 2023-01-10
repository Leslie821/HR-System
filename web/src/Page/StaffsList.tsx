import { ClassNames } from "@emotion/react";
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  ChevronIcon,
  createStyles,
  Group,
  Table,
  Text,
} from "@mantine/core";
import { IconArrowNarrowLeft, IconGavel, IconSettings } from "@tabler/icons";
import { information } from "../App";
import DataTable from "react-data-table-component";

interface Props {
  data: information[];
}

const useStyleTable = createStyles((theme) => ({
  body: {
    height: "95vh",
  },
  header: {
    // paddingRight: 30,
    // paddingLeft: 30,
    // border: "1px solid",
  },
  table: {
    // paddingRight: 30,
    // paddingLeft: 30,
    // alignContent: "right",
    // alignItems: "right",
    // width: 70,
  },
}));

const info2 = [
  {
    id: 1,
    name: "Leslie",
    department: "IT",
    jobTitle: "IT",
    email: "leslie@Gmail.comfaslkjflsajlkfjlk",
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

const columns = [
  {
    name: "ID",
    selector: (row: any) => row.title,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row: any) => row.year,
  },
  {
    name: "Department",
    selector: (row: any) => row.year,
  },
  {
    name: "Title",
    selector: (row: any) => row.year,
  },
  {
    name: "Email",
    selector: (row: any) => row.year,
  },
  {
    name: "Employ Date",
    selector: (row: any) => row.year,
  },
  {
    name: "Status",
    selector: (row: any) => row.year,
  },
];

export function StaffsList(props: Props) {
  const { classes } = useStyleTable();

  const info = info2.map((items) => () => {
    return (
      <tr key={items.name}>
        <td> {items.id}</td>
        <td> {items.name}</td>
        <td> {items.department}</td>
        <td> {items.jobTitle}</td>
        <td> {items.email}</td>
        <td> {items.employDate}</td>
        <td> {items.status}</td>
      </tr>
    );
  });

  const data = [
    {
      id: 2,
      title: "Ghostbusters",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];

  return (
    <Group>
      <Group>
        <Button variant="light">
          <IconArrowNarrowLeft size={18} stroke={1.5} />
        </Button>

        <h2>Staff List</h2>
      </Group>

      <DataTable columns={columns} data={data} />
      {/* <Table striped withColumnBorders verticalSpacing="md">
      selectableRows
        <thead>{header}</thead>
        <tbody>{info}</tbody>
      </Table> */}
    </Group>
  );
}

export default StaffsList;
