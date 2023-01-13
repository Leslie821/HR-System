import { Button, Container } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

import { useEffect, useState } from "react";

export function ApplyDayOff() {
  const [from, setFrom] = useState<any>(new Date());
  const [to, setTo] = useState<any>(new Date());
  const [total, setTotal] = useState<any>(0);
  const [info, setInfo] = useState({
    name: "",
    type: "",
    reason: "",
  });



  useEffect(() => {
    let d1: any = from;
    let d2: any = to;
    let result = d2 - d1;
    let one_day = 1000 * 60 * 60 * 24;
    let totalday = result / one_day;
    setTotal(totalday);
  }, [from, to]);


  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formObject: any = {};

          formObject["name"] = info.name;
          formObject["type"] = info.type;
          formObject["from"] = from;
          formObject["to"] = to;
          formObject["total"] = total;
          formObject["reason"] = info.reason;
          fetch("http://localhost:3000/leave/application", {
            method: "Post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formObject),
          });
        }}
      >
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Container>
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
            <div>
              <div style={{ margin: "0px 60px" }}>Dayoff Type</div>
              <br />
              <input
                value={info.type}
                onChange={(e) => {
                  setInfo({ ...info, type: e.currentTarget.value });
                }}
                name="dayoff_type"
                id="dayoff_type"
                type="dayoff_type"
                placeholder="dayoff type"
                style={{ margin: "0px 60px" }}
              ></input>
            </div>
          </div>
          <hr />
          <br></br>
          <div style={{ display: "flex", margin: "20px" }}>
            <div style={{ margin: "0px 30px" }}>{"Total"}</div>

            <input
              value={total}
              onChange={() => {
                setTotal(total);
              }}
              name="total"
              id="total"
              placeholder="number of days"
              type="number"
            ></input>
          </div>

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

          <div style={{ margin: "40px 40px" }}>
            <div>Reason</div>
            <br />
            <textarea
              value={info.reason}
              onChange={(e) => {
                setInfo({ ...info, reason: e.currentTarget.value });
              }}
              name="reason"
              id="reason"
              placeholder="descripe"
              style={{ width: "300px", height: "100px" }}
            ></textarea>
          </div>
          <Container>
            <div style={{ paddingLeft: "700px" }}>
              <div>
                <Button type="submit" onClick={() => {}}>
                  Submit
                </Button>
              </div>
            </div>
          </Container>
          <br></br>
        </Container>
      </form>
    </>
  );
}
