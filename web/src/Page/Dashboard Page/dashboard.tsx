import { useRef } from "react";
import { dateArr } from "./data";
import "./dash.css";
import DashboardScheduler from "../../components/DashboardCalendar/DashboardScheduler";

export default function Dashboard() {
  return (
    <div style={{ width: "80vw", height: "90vh" }}>
      <h1>Hello Donny</h1>

      <DashboardScheduler />
    </div>
  );
}
// hi
