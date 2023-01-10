export function LoadDateoffPending(props: {
    id: number,
    name: string,
    day_off_type: string,
    from: number,
    to: number,
    day_off_length: number,
    reason: string,
    application_date: any,
    approved_by: string,
    status: string

}) {

    return (
        <>
            <div style={{ display: "inline-flex", border: "black solid 3px", justifyContent: "center", textAlign: "center", alignContent: "center" }}>
                <tr>
                    <td>{props.id} </td>
                    <td>{props.name} </td>
                    <td >{props.day_off_length}</td>
                    <td >{props.reason} </td>
                    <td >{props.application_date} </td>
                    <td >{props.approved_by} </td>
                    <td >{props.status} </td>
                </tr>
            </div>
        </>
    )
}