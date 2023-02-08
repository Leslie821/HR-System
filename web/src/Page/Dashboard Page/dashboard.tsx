import "./dash.css";
import DashboardScheduler from "../../components/DashboardCalendar/DashboardScheduler";
// import { CheckInOut } from "../Check in Page/check_in";
import { Button, createStyles, Group } from "@mantine/core";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { IconDatabase } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import { fetchServerDataNonGet } from "../../../utilis/fetchDataUtilis";
import { useState } from "react";

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
    justifyContent: "space-between",
    paddingBottom: 75,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  table: {
    width: "100%",
    margin: 20,
    display: "flex",
    // alignItems: "top",
    justifyContent: "center",
  },
  button: {
    marginBottom: 8,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export async function CheckInOut(InOrOut: any, userID: any) {
  console.log("controller  userID", userID);

  let result = await fetchServerDataNonGet("/checkin" + `/${InOrOut}`, "POST", {
    userID,
  });
  console.log(result);

  {
    result == "Success"
      ? setCheckInResult("success")
      : setCheckInResult("fail");
  }
}

export default function Dashboard() {
  const [checkInResult, setCheckInResult] = useState<any>("");
  const user = useSelector((state: IRootState) => state.user.user); // redux
  const { classes } = useStyleTable();
  return (
    <Group className={classes.body}>
      <Group className={classes.header}>
        <div>
          <h1>Hello {user!.name} </h1>
        </div>
      </Group>
      <Group className={classes.table}>
        <Button
          size="lg"
          leftIcon={<IconDatabase size={14} />}
          className={classes.button}
          onClick={() => {
            CheckInOut("in", user!.id);
            {
              checkInResult == "success"
                ? showNotification({
                    message: "Success",
                  })
                : showNotification({
                    message: "Fail",
                  });
            }
          }}
        >
          Check In
        </Button>
        <Button
          size="lg"
          leftIcon={<IconDatabase size={14} />}
          className={classes.button}
          onClick={() => {
            CheckInOut("out", user!.id);
            {
              checkInResult == "success"
                ? showNotification({
                    message: "Success",
                  })
                : showNotification({
                    message: "Fail",
                  });
            }
          }}
        >
          Check Out
        </Button>
      </Group>

      <DashboardScheduler />
    </Group>
  );
}

function setCheckInResult(arg0: string) {
  throw new Error("Function not implemented.");
}
