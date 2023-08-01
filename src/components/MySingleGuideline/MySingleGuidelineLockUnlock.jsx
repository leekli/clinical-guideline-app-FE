import { Space, Button } from "antd";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { branchLockRequest, branchUnLockRequest } from "../../utils/api-calls";

export const MySingleGuidelineLockUnlock = ({
  branchName,
  branchLockedForApproval,
  setBranchInfo,
}) => {
  const onLockClick = () => {
    branchLockRequest(branchName)
      .then(() => {
        alert("Workspace is now LOCKED!");
        setBranchInfo((currentBranchInfo) => {
          const newCurrentBranchInfo = structuredClone(currentBranchInfo);

          newCurrentBranchInfo.branchLockedForApproval = true;

          return newCurrentBranchInfo;
        });
      })
      .catch(() => {
        alert("There was an error: Workspace is still UNLOCKED");
      });
  };

  const onUnLockClick = () => {
    branchUnLockRequest(branchName)
      .then(() => {
        alert("Workspace is now UN-LOCKED!");
        setBranchInfo((currentBranchInfo) => {
          const newCurrentBranchInfo = structuredClone(currentBranchInfo);

          newCurrentBranchInfo.branchLockedForApproval = false;

          return newCurrentBranchInfo;
        });
      })
      .catch(() => {
        alert("There was an error: Workspace is still LOCKED");
      });
  };

  if (branchLockedForApproval === false) {
    return (
      <>
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
            <p>
              <strong>Lock: </strong>
              <em>Prevents</em> any further amendments.
            </p>
            <p>
              <strong>Unlock: </strong>
              <em>Allows</em> further amendments.
            </p>
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
            <p>
              <strong>Lock: </strong>
              <em>Prevents</em> any further amendments.
            </p>
            <p>
              <strong>Unlock: </strong>
              <em>Allows</em> further amendments.
            </p>
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
