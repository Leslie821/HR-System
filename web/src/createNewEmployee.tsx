

import { Grid, Container, Button } from '@mantine/core';
import { ChangeEvent, useState } from 'react';

import { DatePicker } from '@mantine/dates';


export function CreateNewEmployee() {
    const [contract, setContract] = useState<File | any>();
    const [mpf, setMpf] = useState<File | any>();
    //////////////////////////////////up is send file a////////////////////////////


    const [value, onChange] = useState<any>(new Date());
    const [info, setInfo] = useState({
        name: "",
        birthday: "",
        gender: "",
        email: "",
        phone: "",
        address: "",
        department: "",
        job_title: "",
        job_nature: "",
        salary: "",
        employee_type: "",
        annual_leave: "",
        sick_leave: "",
        bank_account: "",
        working_time: "",
        user_name: "",
        password: "",
        access_level: "",
        contract: "",
        mpf: "",
    })
    //      

    ///////////////////////////////////down  is send file b 
    const handleContract = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setContract(e.target.files[0]);
        }
    };
    const handleMpf = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setMpf(e.target.files[0]);
        }
    };

    const formData = new FormData();

    formData.append("name", info.name);
    formData.append("birthday", info.birthday);
    formData.append("gender", info.gender);
    formData.append("email", info.email);
    formData.append("phone", info.phone);
    formData.append("addrss", info.address);
    formData.append("department", info.department);
    formData.append("job_title", info.job_title);
    formData.append("salary", info.salary);
    formData.append("employee_type", info.employee_type);
    formData.append("annual_leave", info.annual_leave);
    formData.append("sick_leave", info.sick_leave);
    formData.append("bank_account", info.bank_account);
    formData.append("working_time", info.working_time);
    formData.append("user_name", info.user_name);
    formData.append("password", info.password);
    formData.append("access_level", info.access_level);
    formData.append("contract", contract);
    formData.append("mpf", mpf);
    formData.append("employment_date", value);


    // type ActiveInput = 'Employment Date' | ''
    const [activeInput, setActiveInput] = useState<String>('');
    function selectActiveInput(name: String) {
        return (e: { stopPropagation: () => void }) => {
            setActiveInput(name)
            e.stopPropagation()
        }
    }
    return (
        <div>
            <form onSubmit={(event) => {
                event.preventDefault()
                fetch('register', {
                    method: "Post",
                    body: formData
                })
            }}>
                <div onClick={() => setActiveInput('')}>
                    <h1>Create New Employee</h1>
                    <br />

                    <div style={{ display: 'block', justifyContent: "left", alignItems: "left" }}>
                        <Container style={{ margin: "10px 0px" }} >
                            <h3>Employee Information</h3>
                            <Container style={{ border: "lightblue dotted 4px", margin: "10px 0px" }}>
                                <Grid>
                                    <div style={{ display: 'flex', justifyContent: "left", alignItems: "left", margin: "10px", }}>
                                        <Grid.Col span={4}>
                                            <div >
                                                <div>Name</div>
                                                <input value={info.name} onChange={e => { setInfo({ ...info, name: e.currentTarget.value }) }} id="name" name='name' type="text" placeholder="Name" ></input>
                                            </div>
                                        </Grid.Col>
                                        <Grid.Col span={4} style={{ margin: "0px 105px" }} >
                                            <div >
                                                <div>Birthday Date</div>
                                                <input value={info.birthday} onChange={e => { setInfo({ ...info, birthday: e.currentTarget.value }) }} id="birthday" name="birthday" type="Date" placeholder="Birthday"></input>

                                            </div>
                                        </Grid.Col>
                                    </div>
                                </Grid>

                                <Grid>
                                    <div style={{ display: 'flex', justifyContent: "left", alignItems: "left", margin: "10px" }}>
                                        <Grid.Col span={4}>
                                            <div >
                                                <div>Gender</div>
                                                <input value={info.gender} onChange={e => { setInfo({ ...info, gender: e.currentTarget.value }) }} id="gender" name="gender" type="text" placeholder="Gender"></input>
                                            </div>
                                        </Grid.Col>
                                        <Grid.Col span={4} style={{ margin: "0px 100px" }}>
                                            <div >
                                                <div >Email</div>
                                                <input value={info.email} onChange={e => { setInfo({ ...info, email: e.currentTarget.value }) }} id="email" name="email" type="email" placeholder="email"></input>
                                            </div>
                                        </Grid.Col>
                                    </div>
                                </Grid>

                                <Grid>
                                    <div style={{ display: 'flex', justifyContent: "left", alignItems: "left", margin: "10px" }}>
                                        <Grid.Col span={4}>
                                            <div >
                                                <div>Phone</div>
                                                <input value={info.phone} onChange={e => { setInfo({ ...info, phone: e.currentTarget.value }) }} id="phone" name="phone" type="number" placeholder="Phone"></input>
                                            </div>
                                        </Grid.Col>
                                        <Grid.Col span={4} style={{ margin: "0px 100px" }}>
                                            <div >
                                                <div >Address</div>
                                                <input value={info.address} onChange={e => { setInfo({ ...info, address: e.currentTarget.value }) }} id="address" name="address" type="text" placeholder="address"></input>
                                            </div>
                                        </Grid.Col>
                                    </div>
                                </Grid>
                            </Container>




                        </Container>
                    </div>



                    {/* ************************************************************************************************************** */}

                    <div style={{ display: 'block', justifyContent: "left", alignItems: "left" }}>
                        <Container style={{ margin: "10px 0px" }} >
                            <h3>Job Details</h3>
                            <Container style={{ border: "lightblue dotted 4px", margin: "10px 0px" }}>
                                <Grid>
                                    <div style={{ display: 'flex', justifyContent: "left", alignItems: "left", margin: "10px", }}>
                                        <Grid.Col span={4}>
                                            <div >
                                                <div>Department</div>
                                                <input value={info.department} onChange={e => { setInfo({ ...info, department: e.currentTarget.value }) }} id="department" name="department" type="text" placeholder="Department"></input>
                                            </div>
                                        </Grid.Col>
                                        <Grid.Col span={4} style={{ margin: "0px 100px" }}>
                                            <div >
                                                <div>Jobtitle</div>
                                                <input value={info.job_title} onChange={e => { setInfo({ ...info, job_title: e.currentTarget.value }) }} id="job_title" name="job_title" type="text" placeholder="Job title"></input>
                                            </div>
                                        </Grid.Col>
                                    </div>
                                </Grid>

                                <Grid>
                                    <div style={{ display: 'flex', justifyContent: "left", alignItems: "left", margin: "10px" }}>
                                        <Grid.Col span={4}>
                                            <div >
                                                <div>Job Nature</div>
                                                <input value={info.job_nature} onChange={e => { setInfo({ ...info, job_nature: e.currentTarget.value }) }} id="job_nature" name="job_nature" type="text" placeholder="Job Nature"></input>
                                            </div>
                                        </Grid.Col>
                                        <Grid.Col span={4} style={{ margin: "0px 90px" }}
                                            onClick={selectActiveInput('Employment Date')}>

                                            <div >
                                                <div  >Employment Date </div>
                                                <DatePicker value={value} onChange={onChange} />
                                            </div>

                                        </Grid.Col>
                                    </div>
                                </Grid>

                                <Grid>
                                    <div style={{ display: 'flex', justifyContent: "left", alignItems: "left", margin: "10px" }}>
                                        <Grid.Col span={4}>
                                            <div >
                                                <div>Salary</div>
                                                <input value={info.salary} onChange={e => { setInfo({ ...info, salary: e.currentTarget.value }) }} id="salary" name="salary" type="text" placeholder="Salary"></input>
                                            </div>
                                        </Grid.Col>
                                        <Grid.Col span={4} style={{ margin: "0px 100px" }}>
                                            <div >
                                                <div >Employee Type</div>
                                                <input value={info.employee_type} onChange={e => { setInfo({ ...info, employee_type: e.currentTarget.value }) }} id="employee_type" name="employee_type" type="text" placeholder="Employee Type" ></input>
                                            </div>
                                        </Grid.Col>
                                    </div>
                                </Grid>

                                <Grid>
                                    <div style={{ display: 'flex', justifyContent: "left", alignItems: "left", margin: "10px" }}>
                                        <Grid.Col span={4}>
                                            <div >
                                                <div>Annual Leave</div>
                                                <input value={info.annual_leave} onChange={e => { setInfo({ ...info, annual_leave: e.currentTarget.value }) }} id="annual_leave" name="annual_leave" type="text" placeholder="Annual Leave"></input>
                                            </div>
                                        </Grid.Col>
                                        <Grid.Col span={4} style={{ margin: "0px 100px" }}>
                                            <div >
                                                <div >Sick Leave</div>
                                                <input value={info.sick_leave} onChange={e => { setInfo({ ...info, sick_leave: e.currentTarget.value }) }} id="sick_leave" name="sick_leave" type="text" placeholder="Sick Leave"></input>
                                            </div>
                                        </Grid.Col>
                                    </div>
                                </Grid>

                                <Grid>
                                    <div style={{ display: 'flex', justifyContent: "left", alignItems: "left", margin: "10px" }}>
                                        <Grid.Col span={4}>
                                            <div >
                                                <div>Bank Account</div>
                                                <input value={info.bank_account} onChange={e => { setInfo({ ...info, bank_account: e.currentTarget.value }) }} id="bank_account" name="bank_account" type="number" placeholder="Bank Account"></input>
                                            </div>
                                        </Grid.Col>
                                        <Grid.Col span={4} style={{ margin: "0px 100px" }}>
                                            <div >
                                                <div >Working Time</div>
                                                <input value={info.working_time} onChange={e => { setInfo({ ...info, working_time: e.currentTarget.value }) }} id="working_time" name="working_time" type="text" placeholder="Working Time"></input>
                                            </div>
                                        </Grid.Col>
                                    </div>
                                </Grid>
                            </Container>




                        </Container>
                    </div >



                    {/* ************************************************************************************************************** */}



                    < div style={{ display: 'block', justifyContent: "left", alignItems: "left" }
                    }>
                        <Container style={{ margin: "10px 0px" }} >
                            <h3>Login-in Access</h3>
                            <Container style={{ border: "lightblue dotted 4px", margin: "10px 0px" }}>
                                <Grid>
                                    <div style={{ display: 'flex', justifyContent: "left", alignItems: "left", margin: "10px", }}>
                                        <Grid.Col span={4} >
                                            <div >
                                                <div>User Name</div>
                                                <input value={info.user_name} onChange={e => { setInfo({ ...info, user_name: e.currentTarget.value }) }} id="user_name" name="user_name" type="text" placeholder="User Name"></input>
                                            </div>
                                        </Grid.Col>
                                        <Grid.Col span={4} style={{ margin: "0px 100px" }}>
                                            <div >
                                                <div>Password</div>
                                                <input value={info.password} onChange={e => { setInfo({ ...info, password: e.currentTarget.value }) }} id="password" name="password" type="number" placeholder="Password"></input>
                                            </div>
                                        </Grid.Col>
                                    </div>
                                </Grid>

                                <Grid>
                                    <div style={{ display: 'flex', justifyContent: "left", alignItems: "left", margin: "10px" }}>
                                        <Grid.Col span={4} >
                                            <div >

                                                <div >Access Level</div>

                                                <input value={info.access_level} onChange={e => { setInfo({ ...info, access_level: e.currentTarget.value }) }} id="access_level" name="access_level" type="number" placeholder="Access Level"></input>
                                            </div>
                                        </Grid.Col>
                                        <Grid.Col span={4} style={{ margin: "0px 100px" }}>

                                        </Grid.Col>

                                    </div>
                                </Grid>
                            </Container>




                        </Container>




                        {/* ************************************************************************************************************** */}


                        < div style={{ display: 'block', justifyContent: "left", alignItems: "left" }}>
                            <Container style={{ margin: "10px 0px" }} >
                                <h3>Bank Informatino</h3>
                                <Container style={{ border: "lightblue dotted 4px", margin: "10px 0px" }}>
                                    <Grid>
                                        <div style={{ display: 'flex', justifyContent: "left", alignItems: "left", margin: "10px", }}>
                                            <Grid.Col span={4} >
                                                <div >
                                                    <div>Contract</div>
                                                    <div>
                                                        <div>
                                                            <input type="file" onChange={handleContract} />
                                                            <div>{contract && `${contract.name} - ${contract.type}`}</div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </Grid.Col>
                                            <Grid.Col span={4} style={{ margin: "0px 100px" }}>
                                                <div >
                                                    <div>MPF</div>
                                                    <div>
                                                        <input type="file" onChange={handleMpf} />
                                                        <div>{mpf && `${mpf.name} - ${mpf.type}`}</div>
                                                    </div>
                                                </div>
                                            </Grid.Col>
                                        </div>
                                    </Grid>


                                </Container>




                            </Container>
                        </div >










                    </div>
                </div>
                <div style={{ paddingLeft: "700px" }}>
                    <div><Button type="submit" onClick={() => { console.log(mpf, contract) }}>Register</Button></div>
                </div>
            </form>




        </div>
    )
}