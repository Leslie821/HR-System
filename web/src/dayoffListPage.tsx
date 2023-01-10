
import { useState } from "react";
import { LoadDateoff } from "./loadDateOff";





export function Dayofflist() {

    const [info, setInfo] = useState([
        {
            id: "100",
            name: "Alice",
            current_remainder: "6",
            fixed_ammount: "10",
            remain: "4",
            employee_type: "fulltime"
        },
        {
            id: "39",
            name: "Bob",
            current_remainder: "3",
            fixed_ammount: "10",
            remain: "7",
            employee_type: "fulltime"
        },

    ])

    async function getAL() {
        let res: any = await fetch("/al")
        setInfo(res)
    }
    async function getSL() {
        let res: any = await fetch("/al", {
            method: "POST",
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify("")
        })
        setInfo(res)
    }
    async function getBL() {
        let res: any = await fetch("getAL", {
            method: "Get",
            headers: { "Content-Type": "application/JSON" },
        })
        setInfo(res)
    }


    return (

        <div style={{ padding: "0px 300px" }}>
            <div >
                <div style={{ display: "flex", margin: "0px 50px", padding: "30px" }} >
                    <div style={{ padding: "30px" }}> Filter</div>
                    <div style={{ padding: "30px" }} onClick={() => { getAL() }}><button >AL  </button></div>
                    <div style={{ padding: "30px" }} onClick={() => { getSL() }}><button >SL</button></div>
                    <div style={{ padding: "30px" }} onClick={() => { getBL() }}><button >BL</button></div>
                </div>
            </div>
            <div>

                <div style={{ display: "inline-flex", border: "black solid 3px", justifyContent: "center", textAlign: "center", alignContent: "center" }}>
                    <tr>
                        <th> id</th>
                        <th> name</th>
                        <th >current_remainder</th>
                        <th > fixed_ammount</th>
                        <th >remain</th>
                        <th > employee_type</th>
                    </tr>
                </div>


                <div>
                    {info.map(list => {
                        return (
                            <LoadDateoff
                                id={+list.id}
                                name={list.name}
                                current_remainder={+list.current_remainder}
                                fixed_amount={+list.fixed_ammount}
                                remain={+list.remain}
                                employee_type={list.employee_type}
                            />)
                    })}
                </div>


            </div>

            <br></br>
            <br></br>

            <h4>filter DB login :await this.knex.select("column").from("staff_dayoff_table").where("id","=",1 && "dayofftyle","=","AL" )</h4>
            <br></br>
        </div>
    )
}