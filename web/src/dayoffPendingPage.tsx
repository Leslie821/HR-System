
import { useState } from "react";

import { LoadDateoffPending } from "./loadDateoffPending";
import { Table } from "@mantine/core";





export function DayoffPending() {

    const [info, setInfo] = useState([
        {
            id: "100",
            name: "Alice",
            day_off_type: "SL",
            from: "2022 - 11 - 10",
            to: "2022 - 11 - 15",
            day_off_length: 6,
            reason: "gdfgdfgdfgdfgdfgrdfgerg",
            application_date: "2022-11-19",
            approved_by: "Tony",
            status: "Approved"

        },
        {
            id: "100",
            name: "Alice",
            day_off_type: "SL",
            from: "2022 - 11 - 10",
            to: "2022 - 11 - 15",
            day_off_length: 6,
            reason: "gdfgdfgdfgdfgdfgrdfgerg",
            application_date: "2022-11-19",
            approved_by: "Tony",
            status: "Approved"

        },


    ])

    async function getAll() {
        let res: any = await fetch("/all")
        setInfo(res)
    }
    async function getPending() {
        let res: any = await fetch("/pending", {
            method: "Get",
            // headers: { "Content-Type": "application/JSON" },

        })
        setInfo(res)
    }
    async function getApproved() {
        let res: any = await fetch("getapproved", {
            method: "Get",
            // headers: { "Content-Type": "application/JSON" },
        })
        setInfo(res)
    }


    return (

        <div >
            <div >
                <div style={{ display: "flex", margin: "0px 50px", padding: "30px" }} >
                    <div style={{ padding: "30px" }}> Filter</div>
                    <div style={{ padding: "30px" }} onClick={() => { getAll() }}><button >Show all Application</button></div>
                    <div style={{ padding: "30px" }} onClick={() => { getPending() }}><button >Show Pending Application</button></div>
                    <div style={{ padding: "30px" }} onClick={() => { getApproved() }}><button >Show Approved Application</button></div>
                </div>
            </div>
            <div>
                <Table>
                    {/* <div style={{ display: "inline-flex", border: "black solid 3px", justifyContent: "center", textAlign: "center", alignContent: "center" }}> */}
                    <tr>
                        <th  > ID</th>
                        <th > Name</th>
                        <th >Dayoff Type</th>
                        <th >From</th>
                        <th >To</th>
                        <th >Day Length</th>

                        <th >Application Date</th>
                        <th >Approved By</th>
                        <th >Status</th>
                        <th >Reason</th>
                    </tr>
                    {/* </div> */}
                </Table>

                <div>

                    {info.map(list => {
                        return (
                            <LoadDateoffPending
                                id={+list.id}
                                name={list.name}
                                day_off_type={list.day_off_type}
                                from={list.from}
                                to={list.to}
                                day_off_length={list.day_off_length}
                                reason={list.reason}
                                application_date={list.application_date}
                                approved_by={list.approved_by}
                                status={list.status}
                            />)
                    })}

                </div>


            </div >

            <br></br>
            <br></br>

            <h4>filter DB login :await this.knex.select("column").from("staff_dayoff_table").where("id","=",1 && "dayofftyle","=","AL" )</h4>
            <br></br>
        </div >
    )
}