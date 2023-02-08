import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Select,
  FileInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import moment from "moment";
import { ChangeEvent, useEffect, useState } from "react";
import {
  fetchServerData,
  fetchServerDataForm,
  fetchServerDataNonGet,
} from "../../../utilis/fetchDataUtilis";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../store/store";

export function ApplyClaimFormPage() {
  const dispatch = useDispatch<AppDispatch>();
  let user = useSelector((state: IRootState) => state.user.user); //access_level_id
  const form = useForm({
    initialValues: {
      submitTo: "",
      date: "",
      remark: "",
      type: "",
      amount: "",
      reference: "",
    },

    validate: {
      submitTo: (value) => (value ? null : "no submit target"),
      date: (value) => (value ? null : "no Date"),
      remark: (value) => (value ? null : "no Description"),
      type: (value) => (value ? null : "no Expense Category"),
      amount: (value) => (value ? null : "no Amount"),
      reference: (value) => (value ? null : "no reference"),
    },
  });

  const [managerValues, setManagerValue] = useState<string[]>([]);
  const [file, setFile] = useState<File>();

  //--------------------------------submit form----------------------------------------------------------------
  async function submitForm(v: any) {
    console.log(v);
    console.log(user?.id);

    const formData = new FormData();
    formData.append("staff_id", user!.id.toString());
    formData.append("submitTo", v.submitTo);
    formData.append("date", v.date);
    formData.append("remark", v.remark);
    formData.append("type", v.type);
    formData.append("amount", v.amount);
    formData.append("file", v.reference[0]);
    let res = await fetchServerDataForm("/claim-form/apply", "POST", formData);
    console.log("res", res);

    if (res.result.status) {
      form.reset();
    }
  }

  // -------------------loop manager name list----------------------------------------------------
  const managerName = async () => {
    const res = await fetchServerData("/claim-form/list");
    console.log("res: ", res);

    const departmentEdited = res.map((v: any) => ({
      label: v.users_name,
      value: v.users_id,
      group: v.department_name,
    }));
    setManagerValue(departmentEdited);
  };

  useEffect(() => {
    managerName();
  }, []);
  // ----------------------------uploadFile-----------------------------------------------------
  //   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     if (e.target.files) {
  //       setFile(e.target.files[0]);
  //     }
  //   };

  //   const handleUploadClick = () => {
  //     if (!file) {
  //       return;
  //     }

  //     // 👇 Uploading the file using the fetch API to the server
  //     fetch('https://httpbin.org/post', {
  //       method: 'POST',
  //       body: file,
  //       // 👇 Set headers manually for single file upload
  //       headers: {
  //         'content-type': file.type,
  //         'content-length': `${file.size}`, // 👈 Headers need to be a string
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => console.log(data))
  //       .catch((err) => console.error(err));
  //   };

  return (
    <div>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => submitForm(values))}>
          <Select
            data={managerValues}
            searchable
            withAsterisk
            label="Submit to"
            {...form.getInputProps("submitTo")}
          />

          <TextInput
            withAsterisk
            name="date"
            type="date"
            label="Date"
            max={moment().format("YYYY-MM-DD")}
            {...form.getInputProps("date")}
          />

          <TextInput
            withAsterisk
            name="description"
            type="text"
            label="Remark"
            {...form.getInputProps("remark")}
          />

          <TextInput
            withAsterisk
            name="type"
            type="text"
            label="Type"
            {...form.getInputProps("type")}
          />

          <TextInput
            withAsterisk
            name="amount"
            type="number"
            label="Amount"
            placeholder="$"
            {...form.getInputProps("amount")}
          />

          <FileInput
            placeholder="Pick file"
            label="Reference"
            multiple
            accept="image/png,image/jpeg"
            {...form.getInputProps("reference")}
          />

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
}
