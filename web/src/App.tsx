import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { NavbarNested } from "./components/sideBar/SideBar2";
import Dashboard from "./Page/Dashboard Page/dashboard";
import { Route, Routes } from "react-router-dom";
import { CreateNewEmployee } from "./Page/Staff Pages/createNewEmployeePage";
import { ApplyDayOff } from "./Page/ Leave Pages/applydayoffPage";
import { DayoffPending } from "./Page/ Leave Pages/showDayoffApplicationPage";
import { Dayofflist } from "./Page/ Leave Pages/showDayoffResultPage";
import { DayoffType } from "./Page/ Leave Pages/showDayoffTypePage";
// import { NewEmployee} from "./Page/Staff Pages/newEmployee";
// import { AddLeaveType } from "./Page/ Leave Pages/addLeaveType";
// import StaffsList from "./Page/Staff Pages/StaffsList";
import { StaffsList } from "./Page/Staff Pages/StaffsList";
import { NewEmployee } from "./Page/Staff Pages/newEmployee";
// import { AddLeaveType } from "./Page/ Leave Pages/addLeaveType";

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
        <Route
          path="/staff-list/create-new-employee"
          element={<EmployeeInfoForm mode={"create"} />}
        />
        <Route
          path="/staff-list?q="
          element={<EmployeeInfoForm mode={"edit"} />}
        />
        {/* <Route path="/new-employee" element={<CreateNewEmployee />} /> */}
        <Route path="/apply-day-off" element={<ApplyDayOff />} />
        {/* <Route path="/add-dayoff-type" element={<AddLeaveType />} /> */}
        <Route path="/show_day-off-list" element={<Dayofflist />} />
        <Route path="/show_dayoff_application" element={<DayoffPending />} />
        <Route path="/show_dayoff_type" element={<DayoffType />} />
        <Route
          path="/employee-info"
          element={<NewEmployee mode={"create"} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
