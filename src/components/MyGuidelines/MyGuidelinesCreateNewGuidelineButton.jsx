import { useState, useContext } from "react";
import { UserContext } from "../../contexts/User";
import {
  Space,
  Button,
  Modal,
  Alert,
  Input,
  Form,
  Tooltip,
  message,
} from "antd";
import { FormOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { postNewCreateBranch } from "../../utils/api-calls";

export const MyGuidelinesCreateNewGuidelineButton = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { loggedInUser } = useContext(UserContext);
  const [guidelineTitle, setGuidelineTitle] = useState("");
  const [guidelineNumber, setGuidelineNumber] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const error = () => {
    messageApi.open({
      type: "error",
      content: "There was an error, please try again.",
    });
  };

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
        routeChange(`/workspace-setup`);
      })
      .catch(() => {
        error();
      });
  };

  return (
    <>
      {contextHolder}
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
          title="Complete the following information to begin creating a new Guideline and associated Workspace:"
          open={isModalOpen}
          onCancel={handleModalCancel}
          onOk={form.submit}
          width={"50%"}
          closable
        >
          <Form form={form} onFinish={onButtonClick} required>
            <p>
              <strong>Guideline Title:</strong>
            </p>
            <Input
              placeholder="Enter Guideline Title here..."
              onChange={onModalGuidelineTitleTextChange}
              allowClear
              required
              suffix={
                <Tooltip title="This will be the proposed Title you wish to give the Guideline, it should represent the clinical guideline you aim to give guidance on.">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
            <br />
            <p>
              <strong>Proposed Guideline Number/ID:</strong>
            </p>
            <Input
              placeholder="Enter Guideline Number/ID here..."
              onChange={onModalGuidelineNumberTextChange}
              allowClear
              required
              suffix={
                <Tooltip title="This will be your proposed unique ID/Number for this proposed Clinical Guideline.">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
            <br />
            <p>
              <strong>
                What would you like to name this Guideline Workspace?
              </strong>
            </p>
            <Input
              placeholder="Enter Guideline Workspace name here..."
              onChange={onModalWorkspaceNameTextChange}
              allowClear
              required
              suffix={
                <Tooltip title="The name that you give to a new Workspace will be the title you will find it under the 'My Guidelines Workspace' page.">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
            <br />
            <br />
          </Form>

          <center>
            <Alert
              message={<strong>Next Step:</strong>}
              description="Once you have complete the 3 input boxes, please
      confirm by pressing 'OK'. The newly proposed Guideline will be submitted, and a new 'Guideline Workspace' will be created for you to view & edit."
              type="info"
              showIcon
            />
          </center>
        </Modal>
      </Space>
    </>
  );
};
