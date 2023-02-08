import "./dash.css";
import DashboardScheduler from "../../components/DashboardCalendar/DashboardScheduler";
import { CheckInOut } from "../Check in Page/check_in";
import { Button, createStyles, Group } from "@mantine/core";

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
    paddingBottom: 75,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  table: {
    marginTop: 20,
    display: "flex",
    alignItems: "top",
    justifyContent: "center",
  },
  button: {
    marginBottom: 8,
  },
}));

export default function Dashboard() {
  const { classes } = useStyleTable();
  return (
    <Group className={classes.body}>
      <div className={classes.header}>
        <h1>Hello Donny</h1>
      </div>

      <div className={classes.table}>
        <Button
          className={classes.button}
          onClick={() => {
            CheckInOut();
          }}
        >
          Check In
        </Button>
      </div>

      {/* <DashboardScheduler /> */}
    </Group>
  );
}
// hi
