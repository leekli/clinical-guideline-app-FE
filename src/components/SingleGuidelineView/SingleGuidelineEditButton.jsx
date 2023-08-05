import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/User";
import {
  Space,
  Button,
  Modal,
  Input,
  Form,
  Alert,
  Tooltip,
  message,
  Spin,
} from "antd";
import { EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { postNewBranch } from "../../utils/api-calls";

export const SingleGuidelineEditButton = ({ guideline, setIsError }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { loggedInUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBranchName, setIsEditBranchName] = useState("");
  const [workspaceRequestLoading, setWorkspaceRequestLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const error = () => {
    messageApi.open({
      type: "error",
      content: "There was an error, please try again.",
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const onEditModalTextChange = (event) => {
    setIsEditBranchName(event.target.value);
  };

  const routeChange = (path) => {
    navigate(path);
  };

  const onEditButtonClick = () => {
    setWorkspaceRequestLoading(true);
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
        setWorkspaceRequestLoading(false);
        setIsModalOpen(false);
        routeChange(`/workspace-setup`);
      })
      .catch((err) => {
        setWorkspaceRequestLoading(false);
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
          icon={<EditOutlined />}
          style={{ background: "seagreen", borderColor: "black" }}
          onClick={showModal}
        >
          Submit this Guideline for Editing...
        </Button>

        <Modal
          title="Creating a New Guideline Authoring Workspace"
          open={isModalOpen}
          onOk={form.submit}
          onCancel={handleModalCancel}
          closable
          okText="Submit"
        >
          <p>
            <strong>
              You are about to create a New Guideline Authoring Workspace...
            </strong>
            <br />
            Before submitting, please specify what you wish to call your
            'Guideline Authoring Workspace' for this Guideline to be
            collaborated on:
          </p>
          <Form form={form} onFinish={onEditButtonClick} required>
            <Input
              placeholder="Enter New Guideline Authoring Workspace Title here..."
              onChange={onEditModalTextChange}
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
            <section>
              {workspaceRequestLoading === true ? (
                <Spin tip="Submitting Request...">
                  <div className="content" />
                </Spin>
              ) : (
                ""
              )}
              <center>
                <Alert
                  message={<strong>Next Step:</strong>}
                  description="Once you have input a New Guideline Authoring Workspace Title, please confirm by
                pressing 'Submit'. Your request will then be processed."
                  type="info"
                  showIcon
                />
              </center>
            </section>
          </Form>
        </Modal>
      </Space>
    </>
  );
};
