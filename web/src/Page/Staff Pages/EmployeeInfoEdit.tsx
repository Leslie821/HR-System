import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmployeeInfoForm from "./EmployeeFunction";
import { EmployeeInfoFormProps } from "./EmployeeFunction";

export function EmployeeInfoEdit() {
  const [userData, setUserData] = useState(null);
  let { id } = useParams();

  const fetchUser = async () => {
    const res = await fetch(`http://localhost:3000/employees/${id}`);
    let data = await res.json();
    console.log("data", data);

    let dataWithDate = data.map((v: any) => {
      if (v.employ_date && v.termination_date) {
        return {
          ...v,
          employ_date2: new Date(v.employ_date),
          termination_date2: new Date(v.termination_date),
        };
      } else {
        return {
          ...v,
          employ_date2: new Date(v.employ_date),
          termination_date2: "",
        };
      }
    });
    // console.log("res:", data);

    if (data && Array.isArray(data) && data.length == 1) {
      console.log("dataWithDate", dataWithDate);
      setUserData(dataWithDate[0]);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <EmployeeInfoForm mode={"edit"} data={userData} id={id} />
    </>
  );
}
