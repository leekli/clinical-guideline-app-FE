import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/User";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../utils/api-calls";
import { LoginFormComponent } from "./LoginFormComponent";

export const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userList, setUserList] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [loggingInProgress, setLoggingInProgress] = useState(false);
  const { setLoggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers().then((data) => {
      setUserList(data);
    });
  }, []);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Login success, now redirecting you...",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "There was an error, username does not exist, please try again.",
    });
  };

  const routeChange = (path) => {
    navigate(path);
  };

  const handleSubmit = (event) => {
    setLoggingInProgress(true);
    event.preventDefault();

    const checkUsername = (userList) => userList.userName === newUsername;

    if (userList.some(checkUsername) === true) {
      userList.forEach((eachUser) => {
        if (eachUser.userName === newUsername) {
          success();
          setTimeout(() => {
            setLoggedInUser({
              username: newUsername,
              primaryAccessLevel: eachUser.primaryAccessLevel,
              secondaryAccessLevel: eachUser.secondaryAccessLevel,
            });

            setNewUsername("");
            setLoggingInProgress(false);
            routeChange(`/guidelines`);
          }, 2500);
        }
      });
    } else {
      error();
      setLoggingInProgress(false);
      setNewUsername("");
    }
  };

  return (
    <>
      {contextHolder}
      <main>
        <LoginFormComponent
          newUsername={newUsername}
          setNewUsername={setNewUsername}
          handleSubmit={handleSubmit}
          loggingInProgress={loggingInProgress}
          setLoggingInProgress={setLoggingInProgress}
        />
      </main>
    </>
  );
};
