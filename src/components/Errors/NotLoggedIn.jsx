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
      <Link to="/">Click here to go to the Login page</Link>
    </>
  );
};

export default NotLoggedInError;
