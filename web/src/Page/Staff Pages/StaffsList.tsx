import { Badge, Button, createStyles, Group, Input } from "@mantine/core";
import { IconRowInsertBottom } from "@tabler/icons";
import React from "react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { information } from "../../App";
import SearchBar from "../../components/searchBar/SearchBar";
import { NewEmployee } from "./newEmployee";
import { CSVLink, CSVDownload } from "react-csv";
import { fetchServerData } from "../../../utilis/fetchDataUtilis";

interface Props {
  data: information[];
}

const useStyleTable = createStyles((theme) => ({
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
    maxWidth: 1800,
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
  button: {
    marginBottom: 8,
  },
}));

export function StaffsList(props: Props) {
  const navigate = useNavigate();
  const columns = [
    {
      name: "ID",
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row: any) => row.department_name,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row: any) => row.job_title_type,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
      sortable: true,
    },
    {
      name: "Employ Date",
      selector: (row: any) => row.employ_date,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => {
        if (row.status == "Active") {
          return <Badge>Active</Badge>;
        } else {
          return <Badge color={"red"}>Inactive</Badge>;
        }
      },
      sortable: true,
    },
    {
      name: "Check Details",
      button: true,
      cell: (row: any) => (
        <Button
          variant="light"
          style={{ width: 80 }}
          type="button"
          id={row.user_id}
          onClick={() => navigate(`/employees/${row.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  const { classes } = useStyleTable();
  const [searchValue, setSearchValue] = useState("");

  const [users, setUsers] = useState<any>([
    {
      users_name: "",
      email: "",
      department_name: "",
      id: "",
      job_title_type: "",
      employ_date: "",
      status: "",
    },
  ]);

  const fetchUsers = async () => {
    const res = await fetch(`http://localhost:3000/employees/list`, {
      method: "GET",
    });
    const usersFromDB = await res.json();
    console.log("usersFromDB:", usersFromDB);

    const usersAddStatus = usersFromDB.map((v: any) => {
      if (v.termination_date == null) {
        return {
          ...v,
          status: "Active",
        };
      } else {
        return {
          ...v,
          status: "Inactive",
        };
      }
    });
    setUsers(usersAddStatus);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Group className={classes.body}>
      <div className={classes.header}>
        <Group>
          <h2>All Employee</h2>
        </Group>
      </div>

      <div>
        <Group className={classes.table}>
          <SearchBar
            apiPath={"/employees/list/"}
            setBackData={(data: any) => setUsers(data)}
          />
          {/* <Input
            placeholder="search"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={classes.button}
          ></Input> */}
          <Button
            variant="light"
            className={classes.button}
            onClick={() => navigate(`/employees/create-new-employee`)}
          >
            Create New Employ
          </Button>
          <Button className={classes.button}>
            <CSVLink data={users}>Download me</CSVLink>
          </Button>
          <DataTable columns={columns} data={users} pagination pointerOnHover />
        </Group>
      </div>
    </Group>
  );
}

export default StaffsList;
