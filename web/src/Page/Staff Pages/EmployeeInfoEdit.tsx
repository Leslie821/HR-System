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
    // console.log("res:", data);

    if (data && Array.isArray(data) && data.length == 1) {
      // console.log("OK");
      setUserData(data[0]);
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
