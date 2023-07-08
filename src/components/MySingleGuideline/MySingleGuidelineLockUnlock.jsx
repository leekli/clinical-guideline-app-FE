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
            &nbsp; Lock this workspace (No further edits permitted)
          </Button>
        </Space>
      </>
    );
  } else {
    return (
      <>
        <Space wrap>
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
            &nbsp; Un-lock this workspace (Further edits permitted)
          </Button>
        </Space>
      </>
    );
  }
};
