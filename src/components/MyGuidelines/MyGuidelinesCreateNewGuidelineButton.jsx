import { useState, useContext } from "react";
import { UserContext } from "../../contexts/User";
import { Space, Button, Modal, Alert, Input, Form } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { postNewCreateBranch } from "../../utils/api-calls";

export const MyGuidelinesCreateNewGuidelineButton = () => {
  const { loggedInUser } = useContext(UserContext);
  const [guidelineTitle, setGuidelineTitle] = useState("");
  const [guidelineNumber, setGuidelineNumber] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const onModalGuidelineTitleTextChange = (event) => {
    setGuidelineTitle(event.target.value);
  };

  const onModalGuidelineNumberTextChange = (event) => {
    setGuidelineNumber(event.target.value);
  };

  const onModalWorkspaceNameTextChange = (event) => {
    setWorkspaceName(event.target.value.trim());
  };

  const onButtonClick = () => {
    const currentDateTime = String(Date.now());

    const branchToSetup = {
      type: "create",
      branchName: workspaceName,
      branchSetupDateTime: currentDateTime,
      branchOwner: loggedInUser.username,
      guidelineTitle: guidelineTitle,
      guidelineNumberProposed: guidelineNumber,
    };

    return postNewCreateBranch(branchToSetup)
      .then(() => {
        setIsModalOpen(false);
        alert("New Guideline Creation successful!");
        routeChange(`/myguidelines`);
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
          icon={<FormOutlined />}
          style={{
            borderColor: "black",
          }}
          onClick={showModal}
        >
          Create A New Guideline
        </Button>

        <Modal
          title="Complete the following information to begin new Guideline creation:"
          open={isModalOpen}
          onCancel={handleModalCancel}
          onOk={form.submit}
          width={"50%"}
          closable
        >
          <Form form={form} onFinish={onButtonClick} required>
            <p>Guideline Title:</p>
            <Input
              placeholder="Enter Guideline Title here..."
              onChange={onModalGuidelineTitleTextChange}
              required
            />
            <br />
            <p>Proposed Guideline Number/ID:</p>
            <Input
              placeholder="Enter Guideline Number/ID here..."
              onChange={onModalGuidelineNumberTextChange}
              required
            />
            <br />
            <p>What would you like to name this Guideline Workspace?</p>
            <Input
              placeholder="Enter Guideline Workspace name here..."
              onChange={onModalWorkspaceNameTextChange}
              required
            />
            <br />
            <br />
          </Form>

          <center>
            <Alert
              message="Next Step:"
              description="Once you have complete the two input fields, please
      confirm by pressing 'OK'. The newly proposed Guideline will submit, and a new 'Guideline Workspace' will be created for you to view & edit."
              type="info"
              showIcon
            />
          </center>
        </Modal>
      </Space>
    </>
  );
};
