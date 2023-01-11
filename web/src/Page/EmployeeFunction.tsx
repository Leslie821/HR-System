import React, { useEffect, useState } from 'react'
import { useForm } from '@mantine/form';
import { TextInput, Button, Group, Col, Grid } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { Container } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

type EmployeeInfoFormProps = {
    mode: "create" | "edit"
    data?: any
}
   


function EmployeeInfoForm({ mode, data }: EmployeeInfoFormProps){
  
  const [state,setState] = useState({
        header: mode ==="create" ?"Create New Employee": "Employee Info",
        name: mode === "create" ? "" : data.name,
        birthday: '',
        gender:'',
        email: '',
        phone: '',
        address: '',
        department: '',
        job_title: '',
        employee_type: '',
        salary: '',
        job_nature: '',
        employ_date: '',
        sick_type: '',
        termination_date: '',
        annual_leave: '',
        working_time: '',
        bank_account: '',
        user_name: '',
        access_level: '',
        contract: '',
        mpf:  '',
        button : mode ==="create" ?"Submit": "Update Information" ,
      },
  );
  
  type FormState = typeof state
  
  function inputGroup(label:string,key: keyof FormState,type:"text"|'password'){
    return (
      <Grid.Col span={6} style={{ minHeight: 80 }}>        
        <label htmlFor={label}>{label}</label>
          <TextInput 
            mt="xl"
            type={type}
            id={key}
            name={key}
            value={state[key]} 
            onChange={ (e) => setState({ ...state, [`${key}`] : e.target.value })}
            />
      </Grid.Col>    
          );
        }
        
    function inputdate(label:string,key: keyof FormState,){
      return (
      <>
      <label htmlFor={label}>{label}</label>
      <DatePicker value={state[key]}
      onChange={ (d) => setState({ ...state, [`${key}`] : d })}
      />
      </>
      )
    }
  return (
          <>
           <form onSubmit={e => {
            e.preventDefault()

           }}>
          <h1>{state.header}</h1>
              <h2>Employee Information</h2>
                  <Grid justify="space-between" align="center">
                      {inputGroup('Name','name','text')}
                      {inputGroup('Birthday','birthday','text')}
                      {inputGroup('Gender','gender','text')}
                      {inputGroup('Email','email','text')}
                      {inputGroup('Phone','phone','text')}
                      {inputGroup('Address','address','text')}
                  </Grid>
              <h3>Job Detail</h3>
                  <Grid justify="space-between" align="center">
                      {inputGroup('Department','department','text')}
                      {inputGroup('Job Title','job_title','text')}
                      {inputGroup('Employee Type','employ_date','text')}
                      {inputGroup('Salary','salary','text')}
                      {inputGroup('Job Nature','job_nature','text')}
                      {inputdate('Employ Date','employ_date')}
                      {inputGroup('Sick Type','sick_type','text')}
                      {inputdate('Termination Date','termination_date')}
                      {inputGroup('Annual Leave','annual_leave','text')}
                      {inputGroup('Working Time','working_time','text')}
                      {inputGroup('Bank Account','bank_account','text')}
                  </Grid>
              <h3>Log-in Access</h3>
                  <Grid justify="space-between" align="center">
                      {inputGroup('Email','user_name','text')}
                      {inputGroup('Access Level','access_level','text')}
                      {inputGroup('Contract','contract','text')}
                      {inputGroup('Mpf','mpf','text')}
                  </Grid>
                <div></div>
              <div>
                <Button type="submit" onClick={()=>{}}>
                  {state.button}
                </Button>
              </div>
              </form>
          </>
          )
}
    
export default EmployeeInfoForm
