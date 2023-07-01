import { Alert, Button, Input, Tooltip } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

export const LoginFormComponent = ({
  newUsername,
  setNewUsername,
  handleSubmit,
}) => {
  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  return (
    <>
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
    </>
  );
};
