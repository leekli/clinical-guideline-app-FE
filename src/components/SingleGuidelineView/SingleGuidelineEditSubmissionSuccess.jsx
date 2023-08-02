import { Alert } from "antd";
import { Link } from "react-router-dom";

export const SingleGuidelineEditSubmissionSuccess = () => {
  return (
    <>
      <Alert
        message={<strong>New Guideline Workspace Setup</strong>}
        description={
          <p>
            Your Submission Request was successful.<br></br>
            <br></br>
            Your New Guideline Workspace has set up, and is ready for authoring.
            You can view this by clicking the 'My Guidelines Workspace' button
            in the Navigation Bar above.
          </p>
        }
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
