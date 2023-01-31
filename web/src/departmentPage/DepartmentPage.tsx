import { Button, Group, Modal } from "@mantine/core";
import { useState } from "react";
import DepartmentAddNew from "./DepartmentAddNew";

function DepartmentPage() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <>
      <Modal
        opened={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        title="Create New Department"
      >
        <DepartmentAddNew />
      </Modal>

      <Group>
        <Button onClick={() => setOpenCreateModal(true)}>
          Create New Department
        </Button>
      </Group>
    </>
  );
}

export default DepartmentPage;
