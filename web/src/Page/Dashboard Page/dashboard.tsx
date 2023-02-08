import "./dash.css";
import DashboardScheduler from "../../components/DashboardCalendar/DashboardScheduler";
import { CheckInOut } from "../Check in Page/check_in";
import { Button } from "@mantine/core";

export default function Dashboard() {
  return (
    <div style={{ width: "80vw", height: "90vh" }}>
      <h1>Hello Donny</h1>

      <div style={{ paddingLeft: "600px" }}>
        <Button
          onClick={() => {
            CheckInOut();
          }}
        >
          Check In
        </Button>
      </div>

      {/* <DashboardScheduler /> */}
    </div>
  );
}
// hi
