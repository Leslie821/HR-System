import React from "react";
export async function CheckInOut() {
  console.log("check ip");

  let result = await fetch(import.meta.env.VITE_SERVER_API + "/checkin", {
    method: "Get",
  });

  console.log(result);
}
