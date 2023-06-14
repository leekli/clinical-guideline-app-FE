import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { Alert } from "antd";

const ErrorPage = () => {
  const { isLoggedIn } = useContext(UserContext);
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));

  if (isLoggedIn === true || LoggedInCheck === true) {
    return (
      <>
        <br></br>
        <Alert
          message="Error"
          description="Error: The page does not exist"
          type="error"
          showIcon
        />
        <br></br>
        <Link to="/guidelines">Click here to go back to the Homepage</Link>
      </>
    );
  } else {
    return (
      <>
        <br></br>
        <Alert
          message="Error"
          description="Error: The page does not exist."
          type="error"
          showIcon
        />
        <br></br>
        <Link to="/">Click here to go back to the Login page</Link>
      </>
    );
  }
};

export default ErrorPage;
