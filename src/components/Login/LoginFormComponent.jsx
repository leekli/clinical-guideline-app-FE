import { Alert, Button, Input, Tooltip, Spin } from "antd";
import {
  InfoCircleOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons";

export const LoginFormComponent = ({
  newUsername,
  setNewUsername,
  handleSubmit,
  loggingInProgress,
  setLoggingInProgress,
}) => {
  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  return (
    <>
      <form className="Login__form" onSubmit={handleSubmit}>
        <label htmlFor="Login__textbox">
          <Alert
            message={<strong>Please Log in</strong>}
            description={`For Demo purposes - Please log in as any of the following: joebloggs (Admin), janedoe (Nurse), katedillon (GP), kelvinball (Approver)`}
            type="info"
            showIcon
          />
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
          <LoginOutlined />
          &nbsp;Log in
        </Button>
        <br />
        <br />
      </form>
    </>
  );
};
