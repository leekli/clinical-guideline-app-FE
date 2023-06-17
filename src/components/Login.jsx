import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/User";
import { Alert, Button, Input, Tooltip } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../utils/api-calls";

export const Login = () => {
  const [userList, setUserList] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const { setLoggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers().then((data) => {
      setUserList(data);
    });
  }, []);

  const routeChange = (path) => {
    navigate(path);
  };

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const checkUsername = (userList) => userList.userName === newUsername;

    if (userList.some(checkUsername) === true) {
      userList.forEach((eachUser) => {
        if (eachUser.userName === newUsername) {
          setLoggedInUser({ username: newUsername });
          localStorage.setItem("username", JSON.stringify(newUsername));
          localStorage.setItem("isLoggedIn", true);
          setNewUsername("");
          routeChange(`/guidelines`);
        }
      });
    } else {
      alert("Username does not exist, please try again");
    }
  };

  return (
    <>
      <main>
        <form className="Login__form" onSubmit={handleSubmit}>
          <label htmlFor="Login__textbox">
            <Alert
              message="Login"
              description={`For Demo purposes - Please log in as any of the following: joebloggs (Admin), janedoe (Nurse), katedillon (GP), kelvinball (Approver)`}
              type="info"
              showIcon
            />
            <br />
            <Input
              name="Login__textbox"
              id="Login__textbox"
              value={newUsername}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              required
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Please enter your username">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
          </label>
          <br />
          <Button type="primary" htmlType="submit" style={{ marginTop: "4px" }}>
            Log in
          </Button>
          <br />
          <br />
        </form>
      </main>
    </>
  );
};
