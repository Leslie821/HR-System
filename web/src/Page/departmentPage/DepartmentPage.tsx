import { Button, createStyles, Group, Modal } from "@mantine/core";
import { useState } from "react";
import DepartmentAddNew from "./DepartmentAddNew";
import DepartmentOrgChart from "./DepartmentOrgChart";

const useStyleTable = createStyles((theme) => ({
  body: {
    height: "95vh",
    marginLeft: 60,
    display: "block",
  },
  table: {
    // maxWidth: 1800,
    width: "100%",
    height: "100vh",
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.md,
  },
}));

function DepartmentPage() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openOrgChart, setOpenOrgChart] = useState(false);
  const { classes } = useStyleTable();

  return (
    <Group className={classes.body}>
      <Modal
        opened={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        title="Create New Department"
      >
        <DepartmentAddNew />
      </Modal>

      <Modal
        opened={openOrgChart}
        onClose={() => setOpenOrgChart(false)}
        className={classes.table}
        fullScreen
      >
        <DepartmentOrgChart />
      </Modal>

      <Group>
        <Button onClick={() => setOpenCreateModal(true)}>
          Create New Department
        </Button>
        <Button onClick={() => setOpenOrgChart(true)}>View Chart</Button>
      </Group>
    </Group>
  );
}

export default DepartmentPage;
