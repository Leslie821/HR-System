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
import { store } from './store/store';
import { Provider } from 'react-redux';
import { JobTitle } from "./Page/Job Title Page/jobTitlePage";

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
    <Provider store={store}>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<NavbarNested />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="/employees" element={<StaffsList data={info} />} />
          <Route
            path="/employees/create-new-employee"
            element={<EmployeeInfoForm mode={"create"} />}
          />
          <Route path="/employees/:id" element={<EmployeeInfoEdit />} />
          {/* <Route path="/new-employee" element={<CreateNewEmployee />} /> */}
          <Route path="/apply-day-off" element={<ApplyDayOff />} />
          {/* <Route path="/add-dayoff-type" element={<AddLeaveType />} /> */}

          <Route path="/show_dayoff_application" element={<DayoffPending />} />
          <Route path="/show_dayoff_type" element={<DayoffType />} />
          <Route path="/job_title" element={<JobTitle />} />

          <Route
            path="/employee-info"
            element={<NewEmployee mode={"create"} />}
          />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
