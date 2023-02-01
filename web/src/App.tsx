import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { NavbarNested } from "./components/sideBar/SideBar2";
import Dashboard from "./Page/Dashboard Page/dashboard";
import { Route, Routes } from "react-router-dom";
import { CreateNewEmployee } from "./Page/Staff Pages/createNewEmployeePage";
import { ApplyDayOff } from "./Page/ Leave Pages/applydayoffPage";
import { DayoffPending } from "./Page/ Leave Pages/showDayoffApplicationPage";

import { DayoffType } from "./Page/ Leave Pages/showDayoffTypePage";
// import { NewEmployee} from "./Page/Staff Pages/newEmployee";
// import { AddLeaveType } from "./Page/ Leave Pages/addLeaveType";
// import StaffsList from "./Page/Staff Pages/StaffsList";
import { StaffsList } from "./Page/Staff Pages/StaffsList";
import { NewEmployee } from "./Page/Staff Pages/newEmployee";
import { Login } from "./Page/loginPages/login";
import EmployeeInfoForm from "./Page/Staff Pages/EmployeeFunction";
import { EmployeeInfoEdit } from "./Page/Staff Pages/EmployeeInfoEdit";
// import { AddLeaveType } from "./Page/ Leave Pages/addLeaveType";
//redux
import { IRootState, store } from "./store/store";
import { Provider, useSelector } from "react-redux";
import { JobTitle } from "./Page/Job Title Page/jobTitlePage";
import { JobTitlePage } from "./Page/Job Title Page/showJobTitlePage";
import DepartmentPage from "./departmentPage/DepartmentPage";

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

export interface userId {
  id: string;
}

function App() {
  const user = useSelector((state: IRootState) => state.user.user); //access_level_id

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

  const id: userId[] = [
    {
      id: "",
    },
  ];

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/" element={<NavbarNested />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {user && user.access_level_id && [1].includes(user.access_level_id) && (
        <Route path="/departments" element={<DepartmentPage />} /> )}

        {user && user.access_level_id && [1].includes(user.access_level_id) && (
          <Route path="/employees" element={<StaffsList data={info} />} />)}

        {user && user.access_level_id && [1].includes(user.access_level_id) && (
        <Route path="/employees/create-new-employee"
          element={<EmployeeInfoForm mode={"create"} id={id} />}/>)}

        {user && user.access_level_id && [1].includes(user.access_level_id) && (
        <Route path="/employees/:id" element={<EmployeeInfoEdit />} />)}

        {user && user.access_level_id && [1,2,3].includes(user.access_level_id) && (
        <Route path="/apply-day-off" element={<ApplyDayOff />} />)}

        {user && user.access_level_id && [1,2].includes(user.access_level_id) && (
        <Route path="/show_dayoff_application" element={<DayoffPending />} />)}

        {user && user.access_level_id && [1].includes(user.access_level_id) && (
        <Route path="/show_dayoff_type" element={<DayoffType />} />)}

        {user && user.access_level_id && [1].includes(user.access_level_id) && (
        <Route path="/job_title" element={<JobTitlePage />} />)}

        {user && user.access_level_id && [1].includes(user.access_level_id) && (
        <Route
          path="/employee-info" element={<NewEmployee mode={"create"} id={null} />}/>)}
      </Route>
    </Routes>
  );
}

export default App;
