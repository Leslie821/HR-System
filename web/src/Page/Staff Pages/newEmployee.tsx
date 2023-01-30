import { Container } from "@mantine/core";
import { useState } from "react";
import EmployeeInfoForm from "./EmployeeFunction";
import { EmployeeInfoFormProps } from "./EmployeeFunction";

export function NewEmployee(props: EmployeeInfoFormProps) {
  const [userData, setUserData] = useState();

  return (
    <Container size={800}>
      <EmployeeInfoForm mode={"create"} id={null} data={userData} />
    </Container>
  );
}
