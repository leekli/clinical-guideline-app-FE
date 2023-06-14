import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Input, Tooltip } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

export const Login = () => {
  const [newUsername, setNewUsername] = useState("");
  let navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newUsername === "joe.bloggs") {
      setNewUsername("");
      routeChange(`/guidelines`);
    }
  };

  return (
    <>
      <main>
        <form className="Login__form" onSubmit={handleSubmit}>
          <label htmlFor="Login__textbox">
            <Alert
              message="Login"
              description={`For Demo purposes - Please log in as: joe.bloggs`}
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
