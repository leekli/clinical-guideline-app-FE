import { Button, Modal } from "antd";
import { CheckOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import {
  deleteApprovalByName,
  deleteBranchByBranchName,
  patchGuidelineById,
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
}) => {
  const navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const showConfirm = () => {
    confirm({
      title: "Are you sure that you want to approve this request?",
      icon: <ExclamationCircleFilled />,
      content:
        "By approving this request, the changes will be merged into the main Guideline available for all users to read. It will also delete the current guideline workspace along with this approval request, once the Guideline merge has completed.",
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

        return patchGuidelineById(guidelineId, patchedGuideline, submissionInfo)
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
            routeChange(`/myapprovals`);
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
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
