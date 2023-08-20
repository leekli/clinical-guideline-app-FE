import { Alert, Button, Input, Tooltip, Spin, Space } from "antd";
import {
  InfoCircleOutlined,
  UserOutlined,
  LoginOutlined,
  KeyOutlined,
} from "@ant-design/icons";

export const LoginFormComponent = ({
  newUsername,
  newPassword,
  setNewUsername,
  setNewPassword,
  handleSubmit,
  loggingInProgress,
  setLoggingInProgress,
}) => {
  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  return (
    <>
      <form className="Login__form" onSubmit={handleSubmit}>
        <label htmlFor="Login__textbox">
          <Space
            direction="vertical"
            style={{
              width: "75%",
            }}
          >
            <Alert
              message={<strong>Please Log in</strong>}
              description={`Enter your Username and Password, below and then press 'Log In'.`}
              type="info"
              showIcon
            />
          </Space>
          <br />
          {loggingInProgress === true ? (
            <Spin tip="Logging in...">
              <div className="content" />
            </Spin>
          ) : (
            ""
          )}
          <br />
          <Input
            name="Login__textbox"
            id="Login__textbox"
            value={newUsername}
            onChange={handleUsernameChange}
            placeholder="Enter your username here..."
            allowClear
            required
            style={{ width: "40vw" }}
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Please enter your username">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
          <br />
          <br />
          <Input
            value={newPassword}
            onChange={handlePasswordChange}
            placeholder="Enter your password here..."
            allowClear
            required
            type="password"
            style={{ width: "40vw" }}
            prefix={<KeyOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Please enter your password">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
        </label>
        <br />
        <Button type="primary" htmlType="submit" style={{ marginTop: "4px" }}>
          <LoginOutlined />
          &nbsp;Log in
        </Button>
        <br />
        <br />
      </form>
    </>
  );
};
