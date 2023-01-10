import { createStyles } from "@mantine/core";
import { useState } from "react";

export function Dashboard() {
  const [count, setCount] = useState(0);

  const useStyles = createStyles((theme) => ({
    test: {
      backgroundColor: theme.black,
      width: "100vw",
      height: "100vh",
      padding: theme.spacing.md,
      color: theme.black,
    },
  }));
  const { classes } = useStyles();

  return (
    <div className={classes.test}>
      <p>123456</p>
    </div>
  );
}
