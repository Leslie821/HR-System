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
  const [file, setFile] = useState<File>();

  const [state, setState] = useState({
    header: mode === "create" ? "Create New Employee" : "Employee Info",
    fetch: mode === "create" ? "register" : "Edit",
    name: mode === "create" ? "" : data.name,
    validate: zodResolver(schema),
    birthday: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    job_title: "",
    employee_type: "",
    salary: "",
    job_nature: "",
    employ_date: "",
    sick_type: "",
    termination_date: "",
    annual_leave: "",
    working_time: "",
    bank_account: "",
    user_name: "",
    access_level: "",
    contract: "",
    mpf: "",
    button: mode === "create" ? "Create" : "Update Information",
  });

  type FormState = typeof state;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    // 👇 Uploading the file using the fetch API to the server
    fetch("/uploadfile", {
      method: "POST",
      body: file,
      // 👇 Set headers manually for single file upload
      headers: {
        "content-type": file.type,
        "content-length": `${file.size}`, // 👈 Headers need to be a string
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
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

  function upload(label: string, key: keyof FormState) {
    return (
      <>
        <Grid.Col span={6} style={{ minHeight: 80 }}>
          <label htmlFor={label}>{label}</label>
          <input type="file" onChange={handleFileChange} />
          <div>{file && `${file.name} - ${file.type}`}</div>
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
          {inputGroup("Employee Type", "employee_type", "text")}
          {inputGroup("Salary", "salary", "text")}
          {inputGroup("Job Nature", "job_nature", "text")}
          {inputdate("Employ Date", "employ_date")}
          {inputGroup("Sick Type", "sick_type", "text")}
          {inputdate("Termination Date", "termination_date")}
          {inputGroup("Annual Leave", "annual_leave", "text")}
          {inputGroup("Working Time", "working_time", "text")}
          {inputGroup("Bank Account", "bank_account", "text")}
        </Grid>
        <h3>Log-in Access</h3>
        <Grid justify="space-between" align="center">
          {inputGroup("Email", "user_name", "text")}
          {inputGroup("Access Level", "access_level", "text")}
          {inputGroup("Contract", "contract", "text")}
          {inputGroup("Mpf", "mpf", "text")}
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

// export default EmployeeInfoForm;
