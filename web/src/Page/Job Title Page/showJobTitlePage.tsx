import { Modal, Group, Button } from "@mantine/core";
import { ResultType } from "@remix-run/router/dist/utils";
import React, { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";

export function JobTitlePage() {
    ///////Inside  Modal///////
    const [inpputtye, setinputtype] = useState(
        {
            type: "",
            departmentId: ""
        },
    )
    const [departmentID, setdepartmentID] = useState<any[]>([])


    async function loadDepartmentID() {
        let rawresult: any = await fetch("http://localhost:3000/job-title/getDepartmentid", {
            method: "Get",
        })
        let result = await rawresult.json()



        setdepartmentID(result)
    }
    // console.log("this is id from dB", departmentID);
    useEffect(() => {
        loadDepartmentID();
    }, [])


    ///////Inside  Modal///////


    const [selectedRows, setSelectedRows] = useState<any>([]);
    const [result, setResult] = useState<any>()
    const handleRowSelected = React.useCallback(
        (state: { selectedRows: any }) => {
            setSelectedRows(state.selectedRows);
        },
        []
    );
    const [opened, setOpened] = useState(false);
    const customStyles = {
        headCells: {
            style: {

                fontSize: "15px",
                marginRight: "0px",
                marginLeft: "0px",
                paddingLeft: "0px",
                paddingRight: "0px",
                width: "5px"
            },
        },
        cells: {
            style: {

                fontSize: "15px",
                marginRight: "0px",
                marginLeft: "0px",
                paddingLeft: "0px",
                paddingRight: "0px",
                width: "fit-content"
            },
        }
    }

    const columns = [
        {
            Width: "5px",

            name: "ID",
            selector: (row: any) => row.id,
        },
        {
            Width: "5px",

            name: "Department Name",
            selector: (row: any) => row.job_title_type,
        },
        {
            Width: "5px",

            name: "Who is the head",
            selector: (row: any) => row.department_id,
        }]
    async function getJobTitle() {
        let res: any = await fetch(
            "http://localhost:3000/job-title/getAllJobTitle"
        );
        let jobTitleFromDB = await res.json();
        // console.log("frontned ", jobTitleFromDB);

        setResult(jobTitleFromDB);
    }
    useEffect(() => {
        getJobTitle();
    }, []);
    return (

        <div style={{ margin: "50px" }}>

            <Modal
                size="auto"
                opened={opened}
                onClose={() => setOpened(false)}

            >
                <form
                    onSubmit={async (event) => {
                        event.preventDefault();
                        // const form = event.target as HTMLFormElement
                        // const formData = new FormData(form);
                        // console.log(formData);


                        await fetch("http://localhost:3000/job-title/createNewJobTitle", {
                            method: "Post",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(inpputtye),
                        });


                        // window.location.reload()
                    }}
                >

                    <div>

                        <div >Type</div>
                        <br />
                        <input required
                            value={inpputtye.type}
                            onChange={(e) => {
                                setinputtype({ ...inpputtye, type: e.currentTarget.value });
                            }}
                            name="type"
                            id="type"
                            type="text"
                            placeholder="Job Title"

                        ></input>


                    </div>

                    <br></br>
                    <div>
                        <div >JobTitle ID</div>
                        <br />

                        <select required value={inpputtye.departmentId} onChange={(e: any) => setinputtype({ ...inpputtye, departmentId: e.currentTarget.value })} >
                            <option value="" disabled hidden > Select a type </option>
                            {departmentID.map(v => <option value={v.id}> {v.department_name} </option>)}

                        </select>

                    </div>
                    {/* {info.type == "" ? <Alert icon={<IconAlertCircle size={16} />} title="Bummer!" color="red">
                    Please Select a type
                </Alert> : ""} */}
                    <br></br>

                    <div   >

                        <Button type="submit">
                            Submit
                        </Button>
                    </div>

                </form>
            </Modal>




            <DataTable
                columns={columns}
                data={result}
                customStyles={customStyles}
                onSelectedRowsChange={handleRowSelected}
            />

            <Group position="center">
                <Button onClick={() => setOpened(true)}>Add New Job Title</Button>
            </Group>
        </div>
    )
}