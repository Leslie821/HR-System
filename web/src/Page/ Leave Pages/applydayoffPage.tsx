import { Alert, Button, Container, List } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconAlertCircle, IconWindowMaximize } from "@tabler/icons";

import { ChangeEvent, useEffect, useState } from "react";
// import { Loaddayoff } from "./loaddayofftype";



export function ApplyDayOff() {
  const [dayofftype, setdayofftype] = useState<any[]>([])
  const [from, setFrom] = useState<any>(new Date())
  const [to, setTo] = useState<any>(new Date())
  const [total, setTotal] = useState<any>(0);
  const [info, setInfo] = useState<any>({
    name: "",
    type: "",
    reason: "",

  });
  const [refresh, setRefresh] = useState(true)
  const [file, setFile] = useState<File>()

  //----------------------------------------------------------------
  async function getdayofftype() {
    let rawresult: any = await fetch("http://localhost:3000/leave/gettype", {
      method: "Get"
    })
    let result = await rawresult.json()

    console.log(result);




    setdayofftype(result.filter((v: { short_form: any; }) => !!v.short_form))
  }

  ////////////////submit file///////////////////////////////
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // const handleUploadClick = () => {
  //   if (!file) {
  //     return;
  //   }

  //   // 👇 Uploading the file using the fetch API to the server
  //   fetch('https://httpbin.org/post', {
  //     method: 'POST',
  //     body: file,
  //     // 👇 Set headers manually for single file upload
  //     headers: {
  //       'content-type': file.type,
  //       'content-length': `${file.size}`, // 👈 Headers need to be a string
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.error(err));
  // };



  //////should the page refresh ?///////
  useEffect(() => {
    if (refresh == false) {
      console.log("does it reload?");

      window.location.reload()
      setRefresh(true)
    }
  }, [refresh])

  ///////load the dayoff type for selection///////////
  useEffect(() => {
    getdayofftype()
  }, [])

  // console.log(dayofftype);



  //----------------------------------------------------------------
  useEffect(() => {
    let d1: any = from;
    let d2: any = to;
    let result = d2 - d1;
    let one_day = 1000 * 60 * 60 * 24;
    let totalday = result / one_day;
    let newtotal = Math.ceil(totalday)
    setTotal(newtotal);
  }, [from, to]);



  async function submitfile() {
    // event.preventDefault();

    // Serialize the Form afterwards
    // const form = event.target;
    const formData = new FormData();
    formData.append("name", info.name)
    formData.append("type", info.type)
    formData.append("type", info.reason)
    // formData.append("file", file)



    const res = await fetch("http://localhost:3000/leave/application", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
  }
  return (
    <>

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

            <select value={info.type} onChange={(e) => setInfo({ ...info, type: e.currentTarget.value })} style={{ margin: "0px 60px" }}>
              <option value="Select a type"> Select a type </option>
              {dayofftype.map(v => <option value={v.short_form}> {v.short_form} </option>)}

            </select>
          </div>
        </div>
        <hr />
        <br></br>


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
        <br></br>
        <hr />

        <div style={{ display: "flex" }}>
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

          {/* submit file /////////////////////////////////////// */}
          <div style={{ margin: "40px 40px" }}>
            <input type="file" onChange={handleFileChange} />

            <div>{file && `${file.name} - ${file.type}`}</div>
            {/* <button onClick={handleUploadClick}>Upload</button> */}
          </div>
        </div>


        {/* total should not be ZERO!!!!!!!!!!!!!!! */}
        {total <= 0 ? <Alert icon={<IconAlertCircle size={16} />} title="Bummer!" color="red">
          Something terrible happened! Bro!  Total should not be 0 or a negative number!
        </Alert> : <Container>
          <div style={{ paddingLeft: "700px" }}>
            <div>
              <Button type="submit" onClick={() => {
                setRefresh(false);
                submitfile();
              }}>
                Submit
              </Button>

            </div>
          </div>
        </Container>}
        {/* total should not be ZERO!!!!!!!!!!!!!!! */}

        <br></br>


      </Container>



    </>
  );
}
