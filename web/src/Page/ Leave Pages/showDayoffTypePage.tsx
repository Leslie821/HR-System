import { Button, Container, Group, Modal, Table } from "@mantine/core";
import { useStyleTable } from "../Staff Pages/StaffsList";
import { IconArrowNarrowLeft } from "@tabler/icons";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
// import { useStyleTable } from "./Page/StaffsList";






const columns = [


    {
        name: "Dayoff Name",
        selector: (row: any) => row.dayoff_name,
    },
    {
        name: "Short Form",
        selector: (row: any) => row.short_form,
    },
    {
        name: "One-time Dayoff",
        selector: (row: any) => row.short_form,
    },
    {
        name: "Paid leave ?",
        selector: (row: any) => row.paid_leave,
    },

];





export function DayoffType() {
    const [opened, setOpened] = useState(false);
    const [info, setInfo] = useState<any>([])
    const [addnewInfo, setaddnewInfo] = useState({
        dayoff_name: "",
        short_form: "",
        one_time_dayoff: "",
        paid_leave: ""
    })

    async function getType() {
        let res = await fetch("http://localhost:3000/leave/getdayofftype", {
            method: "Get",
        })
        // console.log(res);

        const result = await res.json()
        setInfo(result)
    }




    useEffect(() => {


        getType()

    }, [])






    return (
        <div>
            <Modal
                size="auto"
                opened={opened}
                onClose={() => setOpened(false)}

            >
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        const formObject: any = {};

                        formObject["dayoff_name"] = addnewInfo.dayoff_name;
                        formObject["short_form"] = addnewInfo.short_form;
                        formObject["one_time_dayoff"] = addnewInfo.one_time_dayoff;
                        formObject["paid_leave"] = addnewInfo.paid_leave;


                        fetch("http://localhost:3000/leave/applyDayoff", {
                            method: "Post",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(formObject),
                        });
                    }}
                >


                    <div style={{ display: "flex", margin: "20px" }}>
                        <div>
                            <div style={{ margin: "0px 10px" }}>Dayoff Name</div>
                            <br />
                            <input
                                value={addnewInfo.dayoff_name}
                                onChange={(e) => {
                                    setaddnewInfo({ ...addnewInfo, dayoff_name: e.target.value });
                                }}
                                name="dayoff_name"
                                id="dayoff_name"
                                type="text"
                                placeholder="Day off name"
                                style={{ margin: "0px 10px" }}
                            ></input>
                        </div>
                        <div>
                            <div style={{ margin: "0px 10px" }}>Short Form</div>
                            <br />
                            <input
                                value={addnewInfo.short_form}
                                onChange={(e) => {
                                    setaddnewInfo({ ...addnewInfo, short_form: e.target.value });
                                }}
                                name="short_form"
                                id="short_form"
                                type="short_form"
                                placeholder="short_form"
                                style={{ margin: "0px 10px" }}
                            ></input>
                        </div>
                    </div>
                    <hr />
                    <br></br>

                    <div style={{ display: "flex", margin: "20px" }}>
                        <div >
                            <div style={{ margin: "0px 10px" }}>One Time Dayoff</div>
                            <br></br>
                            <input
                                value={addnewInfo.one_time_dayoff}
                                onChange={(e) => {
                                    setaddnewInfo({ ...addnewInfo, one_time_dayoff: e.target.value });
                                }}
                                name="one_time_dayoff"
                                id="one_time_dayoff"
                                placeholder="one_time_dayoff"
                                type="one_time_dayoff"
                                style={{ margin: "0px 10px" }}
                            ></input>
                        </div>


                        <div>
                            <div style={{ margin: "0px 10px" }}>Paid Leave</div>
                            <br></br>
                            <input
                                value={addnewInfo.paid_leave}
                                onChange={(e) => {
                                    setaddnewInfo({ ...addnewInfo, paid_leave: e.target.value });
                                }}
                                name="paid_leave"
                                id="paid_leave"
                                placeholder="paid leave"
                                type="paid_leave"
                                style={{ margin: "0px 10px" }}
                            ></input>
                        </div>
                    </div>



                    <div style={{ paddingLeft: "250px" }}>
                        <Button type="submit" onClick={() => { }}>
                            Submit
                        </Button>
                    </div>


                    <br></br>

                </form>
            </Modal>

            <Group>
                <Group>
                    <Button variant="light">
                        <IconArrowNarrowLeft size={50} stroke={1.5} />
                    </Button>

                    <h2>Leave Type</h2>
                    <Group position="center">
                        <Button onClick={() => setOpened(true)}>Add New Leave Type</Button>
                    </Group>
                </Group>

                <DataTable

                    columns={columns} data={info} />
                {/* <Table striped withColumnBorders verticalSpacing="md">
      selectableRows
        <thead>{header}</thead>
        <tbody>{info}</tbody>
      </Table> */}
            </Group>
        </div>
    )
}



