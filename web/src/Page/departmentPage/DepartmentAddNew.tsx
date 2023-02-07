import { Box, Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import {
  fetchServerData,
  fetchServerDataNonGet,
} from "../../../utilis/fetchDataUtilis";

function DepartmentAddNew() {
  const [formValues, setFormValues] = useState("");

  const [departmentValues, setDepartmentValue] = useState<string[]>([]);

  const departmentName = async () => {
    const res = await fetchServerData("/department/list");

    const departmentEdited = res.map((v: any) => ({
      label: v.department_name,
      value: v.id,
    }));
    // console.log(departmentEdited);
    setDepartmentValue(departmentEdited);
  };

  async function sendData() {
    console.log("hi");
    // const res = await fetch("http://localhost:3000/department/create", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });

    const res = await fetchServerDataNonGet("/department", "POST", { form });
    return res;
  }

  useEffect(() => {
    departmentName();
  }, []);

  const form = useForm({
    initialValues: {
      departmentName: "",
      parentDepartment: "",
    },
  });

  return (
    <Box>
      <form
        onSubmit={form.onSubmit((values) =>
          setFormValues(JSON.stringify(values))
        )}
      >
        <TextInput
          label="Department"
          placeholder="Department"
          {...form.getInputProps("departmentName")}
        ></TextInput>

        <Select
          searchable
          clearable
          label="Parent Department"
          placeholder="Parent Department"
          data={departmentValues}
          {...form.getInputProps("parentDepartment")}
        />
        <Button type="submit" mt="md" onClick={() => sendData()}>
          Create
        </Button>
      </form>
    </Box>
  );
}

export default DepartmentAddNew;
