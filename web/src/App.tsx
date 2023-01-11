import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { NavbarNested } from "./components/sideBar/SideBar2";
import { Dashboard } from "./Page/dashboard";
import { StaffsList } from "./Page/StaffsList";
import { Route, Routes } from "react-router-dom";
import { CreateNewEmployee } from "./createNewEmployeePage";
import { ApplyDayOff } from "./applydayoffPage";
import { Dayofflist } from "./showDayoffResultPage";
import { DayoffType } from "./showDayoffTypePage";
import { DayoffPending } from "./showDayoffApplicationPage";


// "@types/styled-components": "^5.1.26",
export interface information {
  id: string;
  name: string;
  department: string;
  jobTitle: string;
  email: string;
  employDate: string;
  status: string;
}

function App() {
  const info: information[] = [
    {
      id: "",
      name: "",
      department: "",
      jobTitle: "",
      email: "",
      employDate: "",
      status: "",
    },
  ];
  return (
    <Routes>
      <Route path="/" element={<NavbarNested />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/staff-list" element={<StaffsList data={info} />} />
        <Route path="/new-employee" element={<CreateNewEmployee />} />
        <Route path="/apply-day-off" element={<ApplyDayOff />} />
        <Route path="/show_day-off-list" element={<Dayofflist />} />
        <Route path="/show_dayoff_application" element={<DayoffPending />} />
        <Route path="/show_dayoff_type" element={<DayoffType />} />

      </Route>
    </Routes>
  );
}

export default App;
