import React from "react";
import { fetchServerData, fetchServerDataForm, fetchServerDataNonGet } from "../../../utilis/fetchDataUtilis";
import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
export async function CheckInOut(InOrOut: any, userID: any) {

  console.log("controller  userID", userID);

  let result = await fetchServerDataNonGet("/checkin" + `/${InOrOut}`, "POST", { userID })
  console.log("resuslt", result);



}
