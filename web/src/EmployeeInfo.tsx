import React, { useEffect, useState } from 'react'
import { useForm } from '@mantine/form';
import { TextInput, Button, Group } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { Container } from '@mantine/core';

interface EmployeeProps{
  mode: "Create" | "Edit"
  data?: any
}

function Employee_info({ mode, data }:EmployeeProps) {
  const [state,setState] = useState({
      name: '',
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
    },
);

useEffect( () => {
  console.log(state);
  
},[state])

type FormState = typeof state

function inputGroup(label:string,key: keyof FormState,type:"text"|'password'){
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <TextInput 
        type={type} 
        id={key} 
        name={key} 
        value={state[key]} 
        onChange={ (e) => setState({ ...state, [`${key}`] : e.target.value })}
      />
    </div>
  );
}

return (
        <>
            <h2>Employee Information</h2>
                <Container>
                    {inputGroup('Name','name','text')}
                    {inputGroup('Birthday','birthday','text')}
                    {inputGroup('Gender','gender','text')}
                    {inputGroup('Email','email','text')}
                    {inputGroup('Phone','phone','text')}
                    {inputGroup('Address','address','text')}
                    </Container>
                <h3>Job Detail</h3>
                    <div className='container'>
                    {inputGroup('Department','department','text')}
                    {inputGroup('Job Title','job_title','text')}
                    {inputGroup('Employee Type','employ_date','text')}
                    {inputGroup('Salary','salary','text')}
                    {inputGroup('Job Nature','job_nature','text')}
                    {inputGroup('Employ Date','employ_date','text')}
                    {inputGroup('Sick Type','sick_type','text')}
                    {inputGroup('Termination Date','termination_date','text')}
                    {inputGroup('Annual Leave','annual_leave','text')}
                    {inputGroup('Working Time','working_time','text')}
                    {inputGroup('Bank Account','bank_account','text')}
                    </div>
                <h3>Log-in Access</h3>
                    <div className='container'>
                        {inputGroup('Email','user_name','text')}
                        {inputGroup('Access Level','access_level','text')}
                        {inputGroup('Contract','contract','text')}
                        {inputGroup('Mpf','mpf','text')}
                    </div>
        </>
        )
}
    export default Employee_info