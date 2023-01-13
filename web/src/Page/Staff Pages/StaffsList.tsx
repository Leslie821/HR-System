import { ClassNames } from "@emotion/react";
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  ChevronIcon,
  createStyles,
  Group,
  Input,
  Table,
  Text,
} from "@mantine/core";
import {
  IconArrowNarrowLeft,
  IconGavel,
  IconPlus,
  IconSearch,
  IconSettings,
} from "@tabler/icons";
import DataTable from "react-data-table-component";
import downloadCSV from "react-data-table-component";

import { information } from "../../App";

interface Props {
  data: information[];
}

export const useStyleTable = createStyles((theme) => ({
  body: {
    // height: "95vh",
    marginLeft: 60,
    display: "block",
  },
  header: {
    height: 50,
    maxHeight: 50,
    width: "100%",
    // backgroundColor: theme.colors.blue[6],
    marginTop: 25,
    paddingBottom: 75,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  table: {
    maxWidth: 1200,
    width: "100%",
    marginTop: 50,
    // height: 180,
    display: "flex",
    alignItems: "top",
    justifyContent: "end",
    // marginLeft: "auto",
    // marginRight: "auto",
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.md,
  },
}));

function createNewEmployee() {}

const columns = [
  {
    name: "ID",
    selector: (row: any) => row.title,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row: any) => row.year,
    sortable: true,
  },
  {
    name: "Department",
    selector: (row: any) => row.year,
    sortable: true,
  },
  {
    name: "Title",
    selector: (row: any) => row.year,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row: any) => row.year,
    sortable: true,
  },
  {
    name: "Employ Date",
    selector: (row: any) => row.year,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row: any) => row.year,
    sortable: true,
  },
];

export function StaffsList(props: Props) {
  const { classes } = useStyleTable();

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
    <Group className={classes.body}>
      <div className={classes.header}>
        <Group>
          <h2>All Employee</h2>
        </Group>
      </div>

      <div>
        <Group className={classes.table}>
          <Input placeholder="search" style={{ marginBottom: 8 }}></Input>
          <Button variant="light" style={{ marginBottom: 8 }}>
            {/* <IconPlus size={18} stroke={1.5} style={{ marginRight: 6 }} /> */}
            Create New Employ
          </Button>
          <DataTable columns={columns} data={data} pagination />
        </Group>
      </div>
    </Group>
  );
}

export default StaffsList;
