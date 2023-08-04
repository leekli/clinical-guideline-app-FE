import { Space, Button, Modal, message } from "antd";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { deleteBranchByBranchName } from "../../utils/api-calls";
const { confirm } = Modal;

export const MySingleGuidelineDeleteWorkspaceButton = ({ branchName }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Your Workspace was successfully deleted.",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "There was an error, please try again.",
    });
  };

  const showConfirm = () => {
    confirm({
      closable: true,
      title: "Are you sure that you wish to delete this Workspace?",
      icon: <ExclamationCircleFilled />,
      content:
        "By confirming that you wish to delete this whole workspace, it will mean that the whole workspace, including all progress-to-date by any contributor will be lost and cannot be retrieved. Are you sure that you wish to delete this Workspace?",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        return deleteBranchByBranchName(branchName)
          .then(() => {
            success();
            setTimeout(() => {
              routeChange(`/myguidelines`);
            }, 2000);
          })
          .catch(() => {
            error();
          });
      },
      onCancel() {},
    });
  };

  const routeChange = (path) => {
    navigate(path);
  };

  return (
    <>
      {contextHolder}
      <Space wrap>
        <div
          style={{
            borderStyle: "solid",
            borderColor: "#880808",
            backgroundColor: "#FFCDD2",
            width: "375px",
            margin: "3px",
            padding: "8px",
            borderRadius: "5px",
          }}
        >
          <h4>To Delete this Workspace, click:</h4>
          <Button
            type="primary"
            size="medium"
            icon={<DeleteOutlined />}
            style={{
              background: "red",
              borderColor: "black",
            }}
            onClick={showConfirm}
          >
            &nbsp; Delete Workspace
          </Button>
        </div>
      </Space>
    </>
  );
};
