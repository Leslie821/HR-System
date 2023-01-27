import { Alert, Button } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import { useState } from "react";

export function JobTitle() {
    const [inpputtye, setinputtype] = useState(
        {
            type: "",
        },
    )
    const [departmentID, setdepartmentID] = useState<any[]>([])
    return (
        <>
            <form
                onSubmit={async (event) => {
                    event.preventDefault();
                    // const form = event.target as HTMLFormElement
                    // const formData = new FormData(form);
                    // console.log(formData);


                    await fetch("http://localhost:3000/leave/addDayofftype", {
                        method: "Post",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(inpputtye),
                    });


                    window.location.reload()
                }}
            >
                <div style={{ display: "flex", margin: "20px" }}>
                    <div>
                        <div style={{ margin: "0px 10px" }}>Type</div>
                        <br />
                        <input required
                            value={inpputtye.type}
                            onChange={(e) => {
                                setinputtype({ ...inpputtye, type: e.currentTarget.value });
                            }}
                            name="type"
                            id="type"
                            type="text"
                            placeholder="Job Title"
                            style={{ margin: "0px 10px" }}
                        ></input>
                    </div>

                </div>


                <div>
                    <div style={{ margin: "0px 60px" }}>Dayoff Type</div>
                    <br />

                    <select required value={departmentID} onChange={(e: any) => setdepartmentID(e.currentTarget.value)} style={{ margin: "0px 60px" }}>
                        <option value="" selected disabled hidden > Select a type </option>
                        {departmentID.map(v => <option value={v.id}> {v.short_form} </option>)}

                    </select>

                </div>
                {/* {info.type == "" ? <Alert icon={<IconAlertCircle size={16} />} title="Bummer!" color="red">
                    Please Select a type
                </Alert> : ""} */}


                <div style={{ paddingLeft: "250px" }}>

                    <Button type="submit">
                        Submit
                    </Button>
                </div>

                <br></br>
            </form>


        </>
    )
}