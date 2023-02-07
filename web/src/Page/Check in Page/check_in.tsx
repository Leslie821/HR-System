import React from "react";
export async function CheckInOut() {
  console.log("check ip");

  let result = await fetch("http://localhost:3000/checkin", {
    method: "Get",
  });

  console.log(result);
}
