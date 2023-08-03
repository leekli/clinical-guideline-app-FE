import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";
import { Alert } from "antd";

const ErrorPage = () => {
  const { isLoggedIn, loggedInUser } = useContext(UserContext);

  if (isLoggedIn === true && loggedInUser.username !== undefined) {
    return (
      <>
        <Alert
          message={<strong>Error</strong>}
          description="Error: There was an issue with what you tried to do."
          type="error"
          showIcon
        />
        <br />
        <Alert
          description={
            <Link to="/guidelines">
              <h3>
                <strong>
                  Click here to go to the Home page / All Guidelines
                </strong>
              </h3>
            </Link>
          }
          type="error"
        />
      </>
    );
  } else {
    return (
      <>
        <Alert
          message={<strong>Error</strong>}
          description="Error: There was an issue with what you tried to do."
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
  }
};

export default ErrorPage;
