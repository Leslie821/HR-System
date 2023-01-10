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
                <tr key={props.id} >

                    <th>{props.name} </th>
                    <th >{props.current_remainder}</th>
                    <th >{props.fixed_amount} </th>
                    <th >{props.remain} </th>
                    <th >{props.employee_type} </th>
                </tr>
            </div>
        </>
    )
}