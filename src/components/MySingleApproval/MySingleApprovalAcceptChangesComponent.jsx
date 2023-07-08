import { Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import {
  deleteApprovalByName,
  deleteBranchByBranchName,
  patchGuidelineById,
} from "../../utils/api-calls";
import { useNavigate } from "react-router-dom";

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

  const handleSubmission = () => {
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
        onClick={handleSubmission}
      >
        Accept Approval Request and Merge Changes
      </Button>
    </>
  );
};
