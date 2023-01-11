export function LoadDateoffPending(props: {
    id: number,
    name: string,
    day_off_type: string,
    from: any,
    to: any,
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
                    <td style={{ padding: "0px 20px" }} >{props.id} </td>
                    <td style={{ paddingLeft: "40px" }} >{props.name} </td>
                    <td style={{ paddingLeft: "80px" }}  >{props.day_off_type}</td>
                    <td style={{ paddingLeft: "50px" }}  >{props.from}</td>
                    <td style={{ padding: "0px 20px" }}  >{props.to}</td>
                    <td style={{ padding: "0px 20px" }}  >{props.day_off_length}</td>

                    <td style={{ paddingLeft: "30px" }}  >{props.application_date} </td>
                    <td style={{ paddingLeft: "40px" }}  >{props.approved_by} </td>
                    <td style={{ padding: "0px 20px" }}  >{props.status} </td>
                    <td style={{ padding: "0px 20px", width: "50" }}  >{props.reason} </td>
                </tr>
            </div>
        </>
    )
}