import { Alert } from "antd";
import { Link } from "react-router-dom";

export const SingleGuidelineEditSubmissionSuccess = () => {
  return (
    <>
      <Alert
        message="New Guideline Workspace Setup"
        description={`Your Submission Request was successful.
        Your New Guideline Workspace has set up, and is ready for authoring. You can view this by clicking the 'My Guidelines Workspace' button in the Navigation Bar above.`}
        type="success"
        showIcon
      />
      <div>
        <br />
        <Link to="/guidelines">
          Click here to go to the Homepage / All Guidelines
        </Link>
        <br />
        <br />
        <Link to="/myguidelines">
          Click here to go to your Guidelines Workspace page
        </Link>
      </div>
    </>
  );
};
