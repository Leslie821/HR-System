import { useState } from "react";
import { LoadDateoff } from "./loadDateOff";
import { Container } from "@mantine/core";




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

        <div style={{ padding: "0px 30px" }}>
            <div >
                <div style={{ display: "flex", margin: "0px 50px", padding: "30px" }} >
                    <div style={{ padding: "30px" }}> Filter</div>
                    <div style={{ padding: "30px" }} onClick={() => { getAL() }}><button > Show AL  </button></div>
                    <div style={{ padding: "30px" }} onClick={() => { getSL() }}><button >Show SL</button></div>
                    <div style={{ padding: "30px" }} onClick={() => { getBL() }}><button >Show BL</button></div>
                </div>
            </div>
            <div>

                <div >
                    <Container >
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ padding: "0px 20px", width: "50px" }} > id</th>
                                    <th style={{ paddingLeft: "40px", width: "50px" }} > name</th>
                                    <th style={{ paddingLeft: "10px", width: "50px" }}  >current_remainder</th>
                                    <th style={{ padding: "0px 10px", width: "50px" }}  > fixed_ammount</th>
                                    <th style={{ padding: "0px 3px", width: "50px" }}  >remain</th>
                                    <th style={{ padding: "0px 3px", width: "50px" }}  > employee_type</th>
                                </tr>
                            </thead>
                        </table>
                    </Container>
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
                            />
                        )
                    })}

                </div>


            </div>

            <br></br>
            <br></br>


            <br></br>
        </div>
    )

}
