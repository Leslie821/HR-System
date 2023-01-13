import { Button, Container } from "@mantine/core";

import { useEffect, useState } from "react";

export function AddLeaveType() {
  const [info, setInfo] = useState({
    dayoff_name: "",
    short_form: "",
    one_time_dayoff: "",
    paid_leave: "",
  });

  const formData = new FormData();

  formData.append("dayoff_name", info.dayoff_name);
  formData.append("short_form", info.short_form);

  formData.append("one_time_dayoff", info.one_time_dayoff);

  formData.append("paid_leave", info.paid_leave);

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetch("applyDayoff", {
            method: "Post",
            body: formData,
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
              <div style={{ margin: "0px 30px" }}>Dayoff Name</div>
              <br />
              <input
                value={info.dayoff_name}
                onChange={(e) => {
                  setInfo({ ...info, dayoff_name: e.currentTarget.value });
                }}
                name="dayoff_name"
                id="dayoff_name"
                type="text"
                placeholder="Day off name"
                style={{ margin: "0px 30px" }}
              ></input>
            </div>
            <div>
              <div style={{ margin: "0px 30px" }}>Short Form</div>
              <br />
              <input
                value={info.short_form}
                onChange={(e) => {
                  setInfo({ ...info, short_form: e.currentTarget.value });
                }}
                name="short_form"
                id="short_form"
                type="short_form"
                placeholder="short_form"
                style={{ margin: "0px 30px" }}
              ></input>
            </div>
          </div>
          <hr />
          <br></br>

          <div style={{ display: "flex", margin: "20px" }}>
            <div>
              <div style={{ margin: "0px 30px" }}>One Time Dayoff</div>
              <br></br>
              <input
                value={info.one_time_dayoff}
                onChange={(e) => {
                  setInfo({ ...info, one_time_dayoff: e.currentTarget.value });
                }}
                name="one_time_dayoff"
                id="one_time_dayoff"
                placeholder="one_time_dayoff"
                type="one_time_dayoff"
                style={{ margin: "0px 30px" }}
              ></input>
            </div>

            <div>
              <div style={{ margin: "0px 30px" }}>Paid Leave</div>
              <br></br>
              <input
                value={info.paid_leave}
                onChange={(e) => {
                  setInfo({ ...info, paid_leave: e.currentTarget.value });
                }}
                name="paid_leave"
                id="paid_leave"
                placeholder="paid leave"
                type="paid_leave"
                style={{ margin: "0px 30px" }}
              ></input>
            </div>
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
