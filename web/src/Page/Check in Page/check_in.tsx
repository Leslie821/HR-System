import React from "react"
export async function Checkin() {
    console.log("check ip");

    let result = await fetch("http://localhost:3000/checkin", {
        method: "Get",
    })

    console.log(result);


}
