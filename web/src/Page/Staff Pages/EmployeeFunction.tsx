import React, { useEffect, useState, ChangeEvent } from "react";
import { zodResolver } from "@mantine/form";
import { TextInput, Button, Group, Col, Grid } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { z } from "zod";

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
};

export default function EmployeeInfoForm({
  mode,
  data,
}: EmployeeInfoFormProps) {

  const [fileContract, setFileContract] = useState<File>();
  const [fileMpf, setFileMpf] = useState<File>();


  const [state, setState] = useState({
    header: mode === "create" ? "Create New Employee" : "Employee Info",
    fetch: mode === "create" ? "register" : "Edit",
    name: mode === "create" ? "" : data.name,
    validate: zodResolver(schema),
    gender: "",
    email: "",
    address: "",
    job_nature: "",
    user_name: "",
    password: "",
    contract: "",
    mpf: "",
    birthday: "",
    employ_date: "",
    termination_date: "",
    working_time: "",
    salary: "",
    annual_leave_fixed: "",
    sick_leave_fixed: "",
    bank_account: "",
    phone: "",
    access_level: "",
    job_title: "",
    department: "",
    button: mode === "create" ? "Create" : "Update Information",
  });

  type FormState = typeof state;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.files) {

      if(key === "contract"){
        setFileContract(e.target.files[0])
      }

      if(key === "mpf"){
        setFileMpf(e.target.files[0])
      }
    }
  };

  // const handleUploadClick = () => {
  //   if (!file) {
  //     return;
  //   }

  //   // 👇 Uploading the file using the fetch API to the server
  //   fetch("/uploadfile", {
  //     method: "POST",
  //     body: file,
  //     // 👇 Set headers manually for single file upload
  //     headers: {
  //       "content-type": file.type,
  //       "content-length": `${file.size}`, // 👈 Headers need to be a string
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.error(err));
  // };

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
          {/* {inputGroup("Department", "department", "text")} */}
          {/* {inputGroup("Job Title", "job_title", "text")}  */}
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
          {inputGroup("User Name", "user_name", "text")}
          {inputGroup("Password", "password", "password")}
          {/* {inputGroup("Access Level", "access_level", "text")} */}
        </Grid>
        <h3>File</h3>
        <Grid>
          {uploadfile("Contract", "contract")}
          {uploadfile("Mpf", "mpf")}
        </Grid>
        <div></div>
        <div></div>
        <div>
          <Button type="submit" onClick={() => {}}>
            {state.button}
          </Button>
        </div>
      </form>
    </>
  );
}