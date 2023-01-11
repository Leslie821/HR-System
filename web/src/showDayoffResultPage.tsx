import { useState } from "react";

import { Container, Table } from "@mantine/core";

const columns = [
    {
        name: "ID",
        selector: (row: any) => row.title,
        sortable: true,
    },
    {
        name: "Name",
        selector: (row: any) => row.year,
    },
    {
        name: "Remainder",
        selector: (row: any) => row.year,
    },
    {
        name: "Fixed Amount",
        selector: (row: any) => row.year,
    },

    {
        name: "Employee Type",
        selector: (row: any) => row.year,
    },
];


export function Dayofflist() {
    // const { classes } = useStyleTable();
    const [info, setInfo] = useState([
        {
            id: "100",
            name: "Alice",
            remain: "6",
            fixed_ammount: "10",
            employee_type: "fulltime"
        },
        {
            id: "39",
            name: "Bob",
            remain: "3",
            fixed_ammount: "10",
            employee_type: "fulltime"
        },

    ])

    const info1 = info.map((items) => (

        <tr key={items.name}>
            <th> {items.id}</th>
            <th> {items.name}</th>
            <th> {items.remain}</th>
            <th> {items.fixed_ammount}</th>
            <th> {items.employee_type}</th>

        </tr>
    )
    );

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

                    <Table>
                        <thead>
                            <tr>
                                <th > id</th>
                                <th > name</th>
                                <th  >current_remainder</th>
                                <th  > fixed_ammount</th>
                                <th >remain</th>
                                <th > employee_type</th>
                            </tr>
                        </thead>
                    </Table>

                </div>


                <div>

                    <tbody>{info1}</tbody>

                </div>


            </div>



            <br></br>
        </div>
    )

}
function useStyleTable(): { classes: any; } {
    throw new Error("Function not implemented.");
}

