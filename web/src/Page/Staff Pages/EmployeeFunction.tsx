import React, { useEffect, useState, ChangeEvent } from "react";
import { zodResolver } from "@mantine/form";
import { TextInput, Button, Group, Col, Grid } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { any, z } from "zod";
import { useParams } from "react-router-dom";
import {
  fetchServerDataForm,
  fetchServerDataNonGet,
} from "../../../utilis/fetchDataUtilis";

const schema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  email: z.string().email({ message: "Invalid email" }),
  age: z
    .number()
    .min(18, { message: "You must be at least 18 to create an account" }),
});

export type EmployeeInfoFormProps = {
  mode: "create" | "edit";
  data?: any;
  id: any;
};

export default function EmployeeInfoForm({
  mode,
  data,
  id,
}: EmployeeInfoFormProps) {
  const employeeInfoForm = async function EmployeeInfoForm() {
    if (mode === "create") {
      console.log("hi from create");
      // const dataFromDB = await fetch("http://localhost:3000/employees", {
      //   method: "Post",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ state }),
      // });
      const dataFromDB = await fetchServerDataNonGet("/employees", "POST", {
        state,
      });
      console.log("data", state);
      return dataFromDB;
    } else if (mode === "edit") {
      console.log("hi from edit");
      const dataFromDB = await fetch(
        `http://localhost:3000/employees/update/${id}`,
        {
          method: "Post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state }),
        }
      );
      return dataFromDB;
    }
  };

  const [fileContract, setFileContract] = useState<File>();
  const [fileMpf, setFileMpf] = useState<File>();

  const [state, setState] = useState({
    header: mode === "create" ? "Create New Employee" : "Employee Info",
    fetch: mode === "create" ? "register" : "Edit",
    name: mode === "create" ? "" : data ? data.name : "",
    gender: mode === "create" ? "" : data ? data.gender : "",
    email: mode === "create" ? "" : data ? data.email : "",
    address: mode === "create" ? "" : data ? data.address : "",
    job_nature: mode === "create" ? "" : data ? data.job_nature : "",
    password: mode === "create" ? "" : data ? data.password : "",
    contract: mode === "create" ? "" : data ? data.contract : "",
    mpf: mode === "create" ? "" : data ? data.mpf : "",
    birthday: mode === "create" ? "" : data ? new Date(data.birthday) : "",
    employ_date:
      mode === "create" ? "" : data ? new Date(data.employ_date) : "",
    termination_date:
      mode === "create" ? "" : data ? new Date(data.termination_date) : "",
    working_time: mode === "create" ? "" : data ? data.working_time : "",
    salary: mode === "create" ? "" : data ? data.salary : "",
    annual_leave_fixed:
      mode === "create" ? "" : data ? data.annual_leave_fixed : "",
    sick_leave_fixed:
      mode === "create" ? "" : data ? data.sick_leave_fixed : "",
    bank_account: mode === "create" ? "" : data ? data.bank_account : "",
    phone: mode === "create" ? "" : data ? data.phone : "",
    access_level: mode === "create" ? "" : data ? data.access_level_type : "",
    job_title: mode === "create" ? "" : data ? data.job_title_type : "",
    department: mode === "create" ? "" : data ? data.department_name : "",
    button: mode === "create" ? "Create" : "Update Information",
    validate: zodResolver(schema),
  });

  useEffect(() => {
    setState({
      header: mode === "create" ? "Create New Employee" : "Employee Info",
      fetch: mode === "create" ? "register" : "Edit",
      name: mode === "create" ? "" : data ? data.name : "",

      gender: mode === "create" ? "" : data ? data.gender : "",
      email: mode === "create" ? "" : data ? data.email : "",
      address: mode === "create" ? "" : data ? data.address : "",
      job_nature: mode === "create" ? "" : data ? data.job_nature : "",
      password: mode === "create" ? "" : data ? data.password : "",
      contract: mode === "create" ? "" : data ? data.contract : "",
      mpf: mode === "create" ? "" : data ? data.mpf : "",
      birthday: mode === "create" ? "" : data ? new Date(data.birthday) : "",
      employ_date:
        mode === "create" ? "" : data ? new Date(data.employ_date) : "",
      termination_date:
        mode === "create" ? "" : data ? new Date(data.termination_date) : "",
      working_time: mode === "create" ? "" : data ? data.working_time : "",
      salary: mode === "create" ? "" : data ? data.salary : "",
      annual_leave_fixed:
        mode === "create" ? "" : data ? data.annual_leave_fixed : "",
      sick_leave_fixed:
        mode === "create" ? "" : data ? data.sick_leave_fixed : "",
      bank_account: mode === "create" ? "" : data ? data.bank_account : "",
      phone: mode === "create" ? "" : data ? data.phone : "",
      access_level: mode === "create" ? "" : data ? data.access_level_type : "",
      job_title: mode === "create" ? "" : data ? data.job_title_type : "",
      department: mode === "create" ? "" : data ? data.department_name : "",
      button: mode === "create" ? "Create" : "Update Information",
      validate: zodResolver(schema),
    });
  }, [data]);

  type FormState = typeof state;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.files) {
      if (key === "contract") {
        setFileContract(e.target.files[0]);
      }

      if (key === "mpf") {
        setFileMpf(e.target.files[0]);
      }
    }
  };

  function inputGroup(
    label: string,
    key: keyof FormState,
    type: "text" | "password"
  ) {
    return (
      <Grid.Col span={6} style={{ minHeight: 80 }}>
        <label htmlFor={label}>{label}</label>
        <TextInput
          mt="xl"
          type={type}
          id={key}
          name={key}
          value={state[key]}
          onChange={(e) => setState({ ...state, [`${key}`]: e.target.value })}
        />
      </Grid.Col>
    );
  }

  function inputdate(label: string, key: keyof FormState) {
    return (
      <>
        <Grid.Col span={6} style={{ minHeight: 80 }}>
          <label htmlFor={label}>{label}</label>
          <DatePicker
            mt="xl"
            value={state[key]}
            onChange={(d) => setState({ ...state, [`${key}`]: d })}
          />
        </Grid.Col>
      </>
    );
  }

  function uploadfile(label: string, key: keyof FormState) {
    return (
      <>
        <Grid.Col span={6} style={{ minHeight: 80 }}>
          <label htmlFor={label}>{label}</label>
          <input type="file" onChange={(e) => handleFileChange(e, key)} />
          {/* <div>{file && `${file.name} - ${file.type}`}</div> */}
        </Grid.Col>
      </>
    );
  }
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1>{state.header}</h1>
        <h2>Employee Information</h2>
        <Grid justify="space-between" align="center">
          {inputGroup("Name", "name", "text")}
          {inputdate("Birthday", "birthday")}
          {inputGroup("Gender", "gender", "text")}
          {inputGroup("Email", "email", "text")}
          {inputGroup("Phone", "phone", "text")}
          {inputGroup("Address", "address", "text")}
        </Grid>
        <h3>Job Detail</h3>
        <Grid justify="space-between" align="center">
          {inputGroup("Department", "department", "text")}
          {inputGroup("Job Title", "job_title", "text")}
          {inputGroup("Salary", "salary", "text")}
          {inputGroup("Job Nature", "job_nature", "text")}
          {inputdate("Employ Date", "employ_date")}
          {inputGroup("Sick Leave", "sick_leave_fixed", "text")}
          {inputdate("Termination Date", "termination_date")}
          {inputGroup("Annual Leave", "annual_leave_fixed", "text")}
          {inputGroup("Working Time", "working_time", "text")}
          {inputGroup("Bank Account", "bank_account", "text")}
        </Grid>
        <h3>Log-in Access</h3>
        <Grid justify="space-between" align="center">
          {inputGroup("Password", "password", "password")}
          {inputGroup("Access Level", "access_level", "text")}
        </Grid>
        <h3>File</h3>
        <Grid>
          {uploadfile("Contract", "contract")}
          {uploadfile("Mpf", "mpf")}
        </Grid>
        <div></div>
        <div></div>
        <div>
          <Button type="submit" onClick={() => employeeInfoForm()}>
            {state.button}
          </Button>
        </div>
      </form>
    </>
  );
}
