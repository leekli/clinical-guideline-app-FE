import { Button, Modal, message } from "antd";
import { CheckOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import {
  deleteApprovalByName,
  deleteBranchByBranchName,
  patchGuidelineById,
  postNewGuideline,
} from "../../utils/api-calls";
import { useNavigate } from "react-router-dom";
const { confirm } = Modal;

export const MySingleApprovalAcceptChangesComponent = ({
  guideline,
  guidelineId,
  approvalPurpose,
  branchOwner,
  branchName,
  approvalName,
  approvalType,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Guideline Approval & Merge was successful.",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "There was an error, please try again.",
    });
  };

  const routeChange = (path) => {
    navigate(path);
  };

  const showConfirm = () => {
    if (approvalType === "edit") {
      confirm({
        title: "Are you sure that you want to approve this request?",
        icon: <ExclamationCircleFilled />,
        content:
          "By approving this request, the changes will be merged into the main Guideline available for all users to read. It will also delete the current Collaborators' Guideline Workspace along with this approval request, once the Guideline merge has completed.",
        onOk() {
          // 1. Setup PATCH request info to send and execute patch
          const patchedGuideline = structuredClone(guideline);

          const dateNow = Date.now();

          const submissionInfo = {
            ChangeNumber: 0,
            ChangeDescription: approvalPurpose,
            ChangeOwner: branchOwner,
            ChangeDatePublished: dateNow,
          };

          return patchGuidelineById(
            guidelineId,
            patchedGuideline,
            submissionInfo
          )
            .then(() => {
              // 2. delete relevant branch
              return deleteBranchByBranchName(branchName);
            })
            .then(() => {
              // 3. delete relevant approval
              return deleteApprovalByName(approvalName);
            })
            .then(() => {
              // 4. navigate back to approvals homepage
              success();
              setTimeout(() => {
                routeChange(`/myapprovals`);
              }, 3000);
            })
            .catch(() => {
              error();
            });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }

    if (approvalType === "create") {
      confirm({
        title: "Are you sure that you want to approve this request?",
        icon: <ExclamationCircleFilled />,
        content:
          "By approving this request, the new Guideline will be set up into the main Guideline Library available for all users to read. It will also delete the current Collaborators' Guideline Workspace along with this approval request, once the Guideline merge has completed.",
        onOk() {
          // 1. Setup POST request info to send and execute post request
          const newGuideline = structuredClone(guideline);

          return postNewGuideline(newGuideline)
            .then(() => {
              // 2. delete relevant branch
              return deleteBranchByBranchName(branchName);
            })
            .then(() => {
              // 3. delete relevant approval
              return deleteApprovalByName(approvalName);
            })
            .then(() => {
              // 4. navigate back to approvals homepage
              success();
              setTimeout(() => {
                routeChange(`/myapprovals`);
              }, 3000);
            })
            .catch(() => {
              error();
            });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        size="large"
        icon={<CheckOutlined />}
        style={{
          background: "seagreen",
          borderColor: "black",
        }}
        onClick={showConfirm}
      >
        Accept Approval Request and Merge Changes
      </Button>
    </>
  );
};
