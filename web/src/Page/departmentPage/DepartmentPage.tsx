import { Button, Group, Modal } from "@mantine/core";
import { useState } from "react";
import DepartmentAddNew from "./DepartmentAddNew";
import DepartmentOrgChart from "./DepartmentOrgChart";

function DepartmentPage() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openOrgChart, setOpenOrgChart] = useState(false);

  return (
    <>
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
        style={{ height: "100vh", width: "100%" }}
      >
        <DepartmentOrgChart />
      </Modal>

      <Group>
        <Button onClick={() => setOpenCreateModal(true)}>
          Create New Department
        </Button>
        <Button onClick={() => setOpenOrgChart(true)}>View Chart</Button>
      </Group>
    </>
  );
}

export default DepartmentPage;
