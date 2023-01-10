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
                <div style={{ padding: "0px 30px", width: "20px" }}>{props.id} </div>
                <div style={{ padding: "0px 30px", width: "40px" }}>{props.name} </div>
                <div style={{ padding: "0px 30px", width: "80px" }} >{props.current_remainder}</div>
                <div style={{ padding: "0px 30px", width: "120px" }} >{props.fixed_amount} </div>
                <div style={{ padding: "0px 30px", width: "100px" }} >{props.remain} </div>
                <div style={{ padding: "0px 30px", width: "50px" }} >{props.employee_type} </div>
            </div>
        </>
    )
}