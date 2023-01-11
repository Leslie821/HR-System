import { Table } from "@mantine/core";

export function LoadDateoff(props: {
    id: number,
    name: string,
    current_remainder: number,
    fixed_amount: number,
    remain: number,
    employee_type: string,
}) {

    return (
        <>
            <Table>
                <div style={{ display: "inline-flex", border: "black solid 3px", textAlign: "center", alignContent: "center" }}>
                    <tr  >
                        <th style={{ padding: "0px 40px", width: "50px" }}>{props.id} </th>
                        <th style={{ padding: "0px 20px", width: "50px" }}>{props.name} </th>
                        <th style={{ padding: "0px 20px", width: "50px" }}>{props.current_remainder}</th>
                        <th style={{ padding: "0px 60px", width: "50px" }}>{props.fixed_amount} </th>
                        <th style={{ paddingLeft: "0px", width: "50px" }}>{props.remain} </th>
                        <th style={{ padding: "0px 20px", width: "50px" }}>{props.employee_type} </th>
                    </tr>
                </div>
            </Table>
        </>
    )
}