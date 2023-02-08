import { Container, createStyles } from "@mantine/core";
import { useState } from "react";
import EmployeeInfoForm from "./EmployeeFunction";
import { EmployeeInfoFormProps } from "./EmployeeFunction";

const useStyleTable = createStyles((theme) => ({
  body: {
    // height: "95vh",
    marginLeft: 600,
    display: "block",
  },
}));

export function NewEmployee(props: EmployeeInfoFormProps) {
  const [userData, setUserData] = useState();
  const { classes } = useStyleTable();

  return (
    <Container className={classes.body}>
      <EmployeeInfoForm mode={"create"} id={null} data={userData} />
    </Container>
  );
}
