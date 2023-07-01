import { useState, useContext } from "react";
import { UserContext } from "../../contexts/User";
import { Space, Button, Modal, Input, Form } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { postNewBranch } from "../../utils/api-calls";

export const SingleGuidelineEditButton = ({ guideline, setIsError }) => {
  const { loggedInUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBranchName, setIsEditBranchName] = useState("");
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const onEditModalTextChange = (event) => {
    setIsEditBranchName(event.target.value);
  };

  const onEditButtonClick = () => {
    const branchEditTitleCopy = editBranchName;
    const branchEditTitleFormatted = branchEditTitleCopy.split(" ").join("-");

    const currentDateTime = String(Date.now());

    const branchToSetup = {
      type: "edit",
      branchName: branchEditTitleFormatted,
      branchSetupDateTime: currentDateTime,
      branchOwner: loggedInUser.username,
      guideline: guideline,
    };

    return postNewBranch(branchToSetup)
      .then(() => {
        setIsModalOpen(false);
        alert("New Branch Successfully submitted!");
      })
      .catch((err) => {
        setIsError({ err });
      });
  };

  return (
    <>
      <Space wrap>
        <Button
          type="primary"
          size="large"
          icon={<EditOutlined />}
          style={{ background: "seagreen", borderColor: "black" }}
          onClick={showModal}
        >
          Submit this Guideline for Editing...
        </Button>

        <Modal
          title="Enter an Edit Workspace Title"
          open={isModalOpen}
          onOk={form.submit}
          onCancel={handleModalCancel}
          closable
        >
          <p>
            Before submitting, please specify what you want to call your 'Edit
            Workspace' for this Guideline:
          </p>
          <Form form={form} onFinish={onEditButtonClick}>
            <Input
              placeholder="Enter Title here..."
              onChange={onEditModalTextChange}
            />
          </Form>
        </Modal>
      </Space>
    </>
  );
};
