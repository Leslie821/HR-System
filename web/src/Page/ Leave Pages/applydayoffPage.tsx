import { Alert, Button, Container, List } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconAlertCircle, IconWindowMaximize } from "@tabler/icons";

import { ChangeEvent, useEffect, useState } from "react";

import { fetchServerData, fetchServerDataForm, fetchServerDataNonGet } from "../../../utilis/fetchDataUtilis";
// import { Loaddayoff } from "./loaddayofftype";

export function ApplyDayOff() {
  const [dayofftype, setdayofftype] = useState<any[]>([])


  const [from, setFrom] = useState<any>(new Date());
  const [to, setTo] = useState<any>(new Date());
  const [total, setTotal] = useState<any>(0);
  const [info, setInfo] = useState<any>({
    name: "",
    type: "",
    reason: "",
  });

  const [file, setFile] = useState<any>();

  //----------------------------------------------------------------
  async function getdayofftype() {
    let rawresult: any = await fetchServerData("leave/gettype")
    let result = await rawresult.json()

    // console.log(result);
    setdayofftype(result.filter((v: { short_form: any; }) => !!v.short_form))
  }

  ////////////////submit file///////////////////////////////
  const handleFileChange = (e?: ChangeEvent<HTMLInputElement>) => {
    if (e?.target.files) {
      setFile(e.target.files[0]);
    }
  };

  ///////load the dayoff type for selection///////////
  useEffect(() => {
    getdayofftype();
  }, []);

  // console.log(dayofftype);

  //----------------------------------------------------------------
  useEffect(() => {
    let d1: any = from;
    let d2: any = to;
    let result = d2 - d1;
    let one_day = 1000 * 60 * 60 * 24;
    let totalday = result / one_day;
    let newtotal = Math.ceil(totalday);
    setTotal(newtotal);
  }, [from, to]);

  async function submitfile() {
    // event.preventDefault();

    // Serialize the Form afterwards
    // const form = event.target;
    const formData = new FormData();
    formData.append("name", info.name);
    formData.append("type", info.type);
    formData.append("from", from);
    formData.append("to", to);
    formData.append("total", total);
    formData.append("reason", info.reason);
    formData.append("file", file);

    const res = await fetchServerDataNonGet("/leave/application", "POST", { formData });

    setFrom("");
    setTo("");
    setInfo({
      name: "",
      type: "",
      reason: "",
    });
    setTotal("");
  }
  return (
    <>
      <br></br>
      <br></br>

      <Container>
        {/*************************    Employee Name Input   *************************/}
        <h1>Dayoff Application</h1>
        <h3>For sick leave, please attach doctor'note</h3>
        <div style={{ display: "flex", margin: "20px" }}>
          <div>
            <div style={{ margin: "0px 30px" }}>Employee</div>
            <br />
            <input
              value={info.name}
              onChange={(e) => {
                setInfo({ ...info, name: e.currentTarget.value });
              }}
              name="employee"
              id="employee"
              type="text"
              placeholder="name"
              style={{ margin: "0px 30px" }}
            ></input>
          </div>

          {/*************************     DayOff Type Input  (dropdown menu) *************************/}
          <div>
            <div style={{ margin: "0px 60px" }}>Dayoff Type</div>
            <br />

            <select
              required
              value={info.type}
              onChange={(e) =>
                setInfo({ ...info, type: e.currentTarget.value })
              }
              style={{ margin: "0px 60px" }}
            >
              <option value="" selected disabled hidden>
                {" "}
                Select a type{" "}
              </option>
              {dayofftype.map((v) => (
                <option value={v.id}> {v.short_form} </option>
              ))}
            </select>
          </div>
          {info.type == "" ? (
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="Bummer!"
              color="red"
            >
              Please Select a type
            </Alert>
          ) : (
            ""
          )}
        </div>
        <hr />
        <br></br>

        {/**************      From   To   Input  ***********/}
        <div style={{ display: "flex", margin: "5px" }}>
          <div style={{ margin: "0px 40px" }}>
            <div>From</div>
            <br />
            <DatePicker value={from} onChange={setFrom} />
          </div>
          <div>
            <div>To</div>
            <br />
            <DatePicker value={to} onChange={setTo} />
          </div>
        </div>

        <br></br>
        <hr />

        {/************** Show  Number of dayoff day (total)  ***********/}
        <div style={{ display: "flex", margin: "20px" }}>
          <div style={{ margin: "0px 30px" }}>{"Total"}</div>
          <input
            disabled
            value={total}
            onChange={() => {
              setTotal(total);
            }}
            name="total"
            id="total"
            placeholder="number of days"
            type="number"
          ></input>
          <div style={{ paddingLeft: "10px" }}> Day</div>
        </div>
        {/* submit file /////////////////////////////////////// */}
        <div>
          {info.type == 2 && (
            <div style={{ margin: "40px 40px" }}>
              <input type="file" onChange={handleFileChange} />

              <div>{file && `${file.name} - ${file.type}`}</div>
            </div>
          )}
        </div>

        <hr />

        {/****8*********************  Logic to hide Submit button when totoal day is zero or negative  ************/}
        {total <= 0 || info.type == "" ? (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Bummer!"
            color="red"
          >
            Something terrible happened! Bro! Total should not be 0 or a
            negative number!
          </Alert>
        ) : (
          <Container>
            <div style={{ paddingLeft: "700px" }}>
              <div>
                <Button
                  type="submit"
                  onClick={() => {
                    submitfile();
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Container>
        )}
        {/* total should not be ZERO!!!!!!!!!!!!!!! */}
      </Container>
    </>
  );
}
