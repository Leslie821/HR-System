import "./dash.css";
import DashboardScheduler from "../../components/DashboardCalendar/DashboardScheduler";
import { CheckInOut } from "../Check in Page/check_in";
import { Button, createStyles, Group } from "@mantine/core";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { IconDatabase } from "@tabler/icons";

const useStyleTable = createStyles((theme) => ({
  body: {
    marginLeft: 40,
    display: "block",
  },
  header: {
    height: 50,
    maxHeight: 50,
    width: "100%",
    marginTop: 25,
    justifyContent: 'space-between',
    paddingBottom: 75,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  table: {
    width:1800,
    marginTop: 20,
    display: "flex",
    alignItems: "top",
    justifyContent: "center",
  },
  button: {
    marginBottom: 8,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export default function Dashboard() {
  const user = useSelector((state: IRootState) => state.user.user); // redux
  const { classes } = useStyleTable();
  return (
    <Group className={classes.body}>
      <Group className={classes.header}>
      <div >
        <h1>Hello {user!.name} </h1>
      </div>
      <Button
          size="lg"
          leftIcon={<IconDatabase size={14} />}
          className={classes.button}
          onClick={() => {
            CheckInOut();
          }}
        >
          Check In
        </Button>
      </Group>

      {/* <Group className={classes.table}>

      </Group> */}
      <DashboardScheduler />

    </Group>
  );
}