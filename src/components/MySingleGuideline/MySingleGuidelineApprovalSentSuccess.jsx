import { Alert } from "antd";

export const MySingleGuidelineApprovalSentSuccess = () => {
  return (
    <>
      <Alert
        message="Approval Request Sent"
        description={`Your Approval Request was successfully submitted.
        Your Guideline Workspace has been locked while pending approval.`}
        type="success"
        showIcon
      />
    </>
  );
};
