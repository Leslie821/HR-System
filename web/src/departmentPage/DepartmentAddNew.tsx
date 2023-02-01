import { Box, Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { fetchServerData } from "../../utilis/fetchDataUtilis";
// import Selector from "../components/selector/Selector";

function DepartmentAddNew() {
  const [formValues, setFormValues] = useState("");

  const [departmentValues, setDepartmentValue] = useState<string[]>([]);

  const departmentName = async () => {
    const res = await fetchServerData("/department/list");
    console.log("res: ", res);
    // const departmentData = await res.json();
    // console.log("departmentData: ", departmentData);
    const departmentEdited = res.map((v: any) => ({
      label: v.department_name,
      value: v.id,
    }));
    console.log(departmentEdited);
    setDepartmentValue(departmentEdited);
  };

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

        <Button mt="md">Cancel</Button>
        <Button type="submit" mt="md">
          Create
        </Button>
      </form>
    </Box>
  );
}

export default DepartmentAddNew;
