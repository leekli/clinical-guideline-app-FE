import { Space, Button, Modal } from "antd";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { deleteBranchByBranchName } from "../../utils/api-calls";
const { confirm } = Modal;

export const MySingleGuidelineDeleteWorkspaceButton = ({ branchName }) => {
  const navigate = useNavigate();

  const showConfirm = () => {
    confirm({
      title: "Are you sure that you wish to delete this Workspace?",
      icon: <ExclamationCircleFilled />,
      content:
        "By confirming that you wish to delete this whole workspace, it will mean that the whole workspace, including all progress-to-date by any contributor will be lost and cannot be retrieved. Are you sure that you wish to delete this Workspace?",
      onOk() {
        return deleteBranchByBranchName(branchName).then(() => {
          alert("Workspace successfully deleted");
          routeChange(`/myguidelines`);
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
      <Space wrap>
        <div
          style={{
            borderStyle: "solid",
            borderColor: "black",
            backgroundColor: "#FFCDD2",
            width: "375px",
            margin: "3px",
            padding: "8px",
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
