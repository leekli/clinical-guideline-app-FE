import "../../styles/MySingleGuidelineModal.css";
import { useState } from "react";
import { Space, Button, Modal } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { branchAddNewAuthdUser } from "../../utils/api-calls";

export const MySingleGuidelineAddUsersButton = ({
  branchName,
  allUsers,
  setBranchInfo,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userSelected, setUserSelected] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const onUserSelectedChange = (event) => {
    setUserSelected(event.target.value);
  };

  const onOKClick = () => {
    const infoToSend = {
      branch_name: branchName,
      userToAdd: userSelected,
    };

    return branchAddNewAuthdUser(infoToSend)
      .then(() => {
        alert("New User added to Workspace");
        setBranchInfo((currentBranchInfo) => {
          const newCurrentBranchInfo = structuredClone(currentBranchInfo);

          newCurrentBranchInfo.branchAllowedUsers.push(userSelected);

          return newCurrentBranchInfo;
        });
        setIsModalOpen(false);
      })
      .catch(() => {
        alert("There was an error, please try again.");
      });
  };

  return (
    <>
      <Space wrap>
        <Button
          type="primary"
          size="medium"
          icon={<UserAddOutlined />}
          style={{
            borderColor: "black",
          }}
          onClick={showModal}
        >
          Add additional users to Workspace
        </Button>

        <Modal
          title="Select a new user to add to this Workspace:"
          open={isModalOpen}
          onCancel={handleModalCancel}
          onOk={onOKClick}
          closable
        >
          <p>Select a user to add:</p>
          <sub>
            Note: Only users with Viewer/Editor/Q.C access priviledges are
            permitted to be added.
          </sub>

          <br />
          <br />

          <center>
            <label for="users"></label>

            <select
              id="users"
              className="classic"
              onChange={onUserSelectedChange}
            >
              {allUsers.map((user) => {
                return <option value={user.userName}>{user.userName}</option>;
              })}
            </select>
          </center>
        </Modal>
      </Space>
    </>
  );
};
