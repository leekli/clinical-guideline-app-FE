import { Link } from "react-router-dom";
import { Alert } from "antd";

const NotLoggedInError = () => {
  return (
    <>
      <br />
      <Alert
        message="Error"
        description="You must be logged in to access this page."
        type="error"
        showIcon
      />
      <br />
      <Alert
        description={
          <Link to="/">
            <h3>
              <strong>Click here to go to the Login page</strong>
            </h3>
          </Link>
        }
        type="error"
      />
    </>
  );
};

export default NotLoggedInError;
