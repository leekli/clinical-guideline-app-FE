import { Space, Button, message } from "antd";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { branchLockRequest, branchUnLockRequest } from "../../utils/api-calls";

export const MySingleGuidelineLockUnlock = ({
  branchName,
  branchLockedForApproval,
  setBranchInfo,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const lockSuccess = () => {
    messageApi.open({
      type: "success",
      content: "Success: The Workspace is now Locked.",
    });
  };

  const lockError = () => {
    messageApi.open({
      type: "error",
      content: "There was an error: The Workspace is still Open & Unlocked.",
    });
  };

  const unlockSuccess = () => {
    messageApi.open({
      type: "success",
      content: "Success: The Workspace is now Unlocked & Open.",
    });
  };

  const unlockError = () => {
    messageApi.open({
      type: "error",
      content: "There was an error: The Workspace is still Locked.",
    });
  };

  const onLockClick = () => {
    branchLockRequest(branchName)
      .then(() => {
        lockSuccess();
        setBranchInfo((currentBranchInfo) => {
          const newCurrentBranchInfo = structuredClone(currentBranchInfo);

          newCurrentBranchInfo.branchLockedForApproval = true;

          return newCurrentBranchInfo;
        });
      })
      .catch(() => {
        lockError();
      });
  };

  const onUnLockClick = () => {
    branchUnLockRequest(branchName)
      .then(() => {
        unlockSuccess();
        setBranchInfo((currentBranchInfo) => {
          const newCurrentBranchInfo = structuredClone(currentBranchInfo);

          newCurrentBranchInfo.branchLockedForApproval = false;

          return newCurrentBranchInfo;
        });
      })
      .catch(() => {
        unlockError();
      });
  };

  if (branchLockedForApproval === false) {
    return (
      <>
        {contextHolder}
        <Space wrap>
          <div
            style={{
              borderStyle: "solid",
              borderColor: "darkgray",
              backgroundColor: "#F5F5F5",
              width: "375px",
              margin: "3px",
              padding: "8px",
            }}
          >
            <h4>What does this do?</h4>
            <sub>
              <strong>Lock: </strong>
              <em>Prevents</em> any further amendments.
            </sub>
            <br />
            <sub>
              <strong>Unlock: </strong>
              <em>Allows</em> further amendments.
            </sub>
            <p>
              <strong>Current Status: </strong>
              {branchLockedForApproval === false ? "✅ Unlocked" : "❌ Locked"}
            </p>
            <Button
              type="primary"
              size="medium"
              icon={<LockOutlined />}
              style={{
                background: "red",
                borderColor: "black",
              }}
              onClick={onLockClick}
            >
              &nbsp; Lock Workspace
            </Button>
          </div>
        </Space>
      </>
    );
  } else {
    return (
      <>
        {contextHolder}
        <Space wrap>
          <div
            style={{
              borderStyle: "solid",
              borderColor: "darkgray",
              backgroundColor: "#F5F5F5",
              width: "375px",
              margin: "3px",
              padding: "8px",
            }}
          >
            <h4>What does this do?</h4>
            <sub>
              <strong>Lock: </strong>
              <em>Prevents</em> any further amendments.
            </sub>
            <br />
            <sub>
              <strong>Unlock: </strong>
              <em>Allows</em> further amendments.
            </sub>
            <p>
              <strong>Current Status: </strong>
              {branchLockedForApproval === false ? "✅ Unlocked" : "❌ Locked"}
            </p>
            <Button
              type="primary"
              size="medium"
              icon={<UnlockOutlined />}
              style={{
                background: "seagreen",
                borderColor: "black",
              }}
              onClick={onUnLockClick}
            >
              &nbsp; Unlock Workspace
            </Button>
          </div>
        </Space>
      </>
    );
  }
};
