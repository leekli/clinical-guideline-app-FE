import { Alert } from "antd";

export const MySingleGuidelineApprovalSentSuccess = () => {
  return (
    <>
      <Alert
        message={<strong>Approval Request Sent</strong>}
        description={
          <p>
            Your Approval Request was successfully submitted.<br></br>
            <br></br>
            Your Guideline Workspace has been locked while your approval is
            pending final review. No further edits are able to be made to the
            Workspace.
          </p>
        }
        type="success"
        showIcon
      />
    </>
  );
};
