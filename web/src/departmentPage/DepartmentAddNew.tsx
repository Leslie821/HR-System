import { Box, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

function DepartmentAddNew() {
  const [formValues, setFormValues] = useState("");

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

        <Button mt="md">Cancel</Button>
        <Button type="submit" mt="md">
          Create
        </Button>
      </form>
    </Box>
  );
}

export default DepartmentAddNew;
