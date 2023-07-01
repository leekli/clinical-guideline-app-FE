import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";
import { Alert } from "antd";

const ErrorPage = () => {
  const { isLoggedIn } = useContext(UserContext);
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));

  if (isLoggedIn === true || LoggedInCheck === true) {
    return (
      <>
        <Alert
          message="Error"
          description="Error: There was an issue with what you tried to do."
          type="error"
          showIcon
        />
        <br />
        <Link to="/guidelines">Click here to go back to the Homepage</Link>
      </>
    );
  } else {
    return (
      <>
        <Alert
          message="Error"
          description="Error: There was an issue with what you tried to do."
          type="error"
          showIcon
        />
        <br />
        <Link to="/">Click here to go back to the Login page</Link>
      </>
    );
  }
};

export default ErrorPage;
