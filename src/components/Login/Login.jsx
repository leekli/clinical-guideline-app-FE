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
  const [newPassword, setNewPassword] = useState("");
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

  const userNameError = () => {
    messageApi.open({
      type: "error",
      content: "There was an error, username does not exist, please try again.",
    });
  };

  const passwordError = () => {
    messageApi.open({
      type: "error",
      content: "Incorrect password, please try again.",
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
          if (newPassword === eachUser.password) {
            success();
            setTimeout(() => {
              setLoggedInUser({
                username: newUsername,
                primaryAccessLevel: eachUser.primaryAccessLevel,
                secondaryAccessLevel: eachUser.secondaryAccessLevel,
              });

              setNewUsername("");
              setNewPassword("");
              setLoggingInProgress(false);
              routeChange(`/guidelines`);
            }, 2500);
          } else {
            passwordError();
            setLoggingInProgress(false);
            setNewUsername("");
            setNewPassword("");
          }
        }
      });
    } else {
      userNameError();
      setLoggingInProgress(false);
      setNewUsername("");
      setNewPassword("");
    }
  };

  return (
    <>
      {contextHolder}
      <main>
        <LoginFormComponent
          newUsername={newUsername}
          newPassword={newPassword}
          setNewUsername={setNewUsername}
          setNewPassword={setNewPassword}
          handleSubmit={handleSubmit}
          loggingInProgress={loggingInProgress}
          setLoggingInProgress={setLoggingInProgress}
        />
      </main>
    </>
  );
};
