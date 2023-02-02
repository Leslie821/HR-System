import { TextInput, Checkbox, Button, Group, Box, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { fetchServerData, fetchServerDataNonGet } from '../../../utilis/fetchDataUtilis';

export  function ApplyClaimFormPage() {
  const form = useForm({
    initialValues: {
      submitTo:'',
      data: '',
      description:'',
      category:'',
      expenseCategory:'',
      amount:'',
      termsOfService: false,
    },

    validate: {
      submitTo: (value) => ((value) ? null : 'no submit target'),
      data: (value) => ((value) ? null : 'no Data'),
      description: (value) => ((value) ? null : 'no Description'),
      category: (value) => ((value) ? null : 'no Category'),
      expenseCategory: (value) => ((value) ? null : 'no Expense Category'),
      amount: (value) => ((value) ? null : 'no Amount'),
    },
  });
  const [managerValues, setManagerValue] = useState<string[]>([]);

  const managerName = async () => {
    const res = await fetchServerData("/claimForm/list");
    console.log("res: ", res);
    // const departmentData = await res.json();
    // console.log("departmentData: ", departmentData);
    const departmentEdited = res.map((v: any) => ({
      label: v.department_name,
      value: v.id,
    }));
    console.log(departmentEdited);
    setManagerValue(departmentEdited);
  };

  useEffect(() => {
    managerName();
  }, []);

  async function SubmitClaimForm(){
    if(!form){

    }else{
      await fetchServerDataNonGet("/claimForm/submission","POST",form);}
        
  }

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>

        <Select
          data={[]} searchable
          withAsterisk
          label="Submit to"
          {...form.getInputProps('submitTo')}        
        />

        <TextInput
          withAsterisk
          name="date"
          type="date"
          label="Data"
          max={moment().format("YYYY-MM-DD")}
          {...form.getInputProps('data')}
        />

        <TextInput
          withAsterisk
          name="description"
          type="text"
          label="Description"
          {...form.getInputProps('description')}
        />

        <TextInput
          withAsterisk
          name="category"
          type="text"
          label="Category"
          {...form.getInputProps('category')}
        />

        <TextInput
          withAsterisk
          name="expenseCategory"
          type="text"
          label="Expense Category"
          {...form.getInputProps('expenseCategory')}
        />


        <TextInput
          withAsterisk
          name="amount"
          type="number"
          label="Amount"
          placeholder="$"
          {...form.getInputProps('amount')}
        />

        {/* <input type="file" onChange={handleFileChange} />

        <div>{file && `${file.name} - ${file.type}`}</div> */}

        <Checkbox
          mt="md"
          label="I agree to apply the form"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group position="right" mt="md">
          <Button 
          type="submit" 
          onClick={() => {SubmitClaimForm()}}>Submit</Button>
        </Group>
      </form>
    </Box>
  );
}