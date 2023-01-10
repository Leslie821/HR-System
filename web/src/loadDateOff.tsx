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
            <div style={{ display: "inline-flex", border: "black solid 3px", justifyContent: "center", textAlign: "center", alignContent: "center" }}>
                <tr>
                    <td>{props.id} </td>
                    <td>{props.name} </td>
                    <td >{props.current_remainder}</td>
                    <td >{props.fixed_amount} </td>
                    <td >{props.remain} </td>
                    <td >{props.employee_type} </td>
                </tr>
            </div>
        </>
    )
}