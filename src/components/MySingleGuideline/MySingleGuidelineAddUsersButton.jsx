import "../../styles/MySingleGuidelineModal.css";
import { useState } from "react";
import { Space, Button, Modal, Alert, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { branchAddNewAuthdUser } from "../../utils/api-calls";

export const MySingleGuidelineAddUsersButton = ({
  branchName,
  allUsers,
  setBranchInfo,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userSelected, setUserSelected] = useState("");

  const success = () => {
    messageApi.open({
      type: "success",
      content: "A new Collaborator was successfully added to the Workspace.",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "There was an error, please try again.",
    });
  };

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
        success();
        setBranchInfo((currentBranchInfo) => {
          const newCurrentBranchInfo = structuredClone(currentBranchInfo);

          newCurrentBranchInfo.branchAllowedUsers.push(userSelected);

          return newCurrentBranchInfo;
        });
        setIsModalOpen(false);
      })
      .catch(() => {
        error();
      });
  };

  return (
    <>
      {contextHolder}
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
          Add Collaborators...
        </Button>

        <Modal
          title="Select a new collaborator to add to this Workspace:"
          open={isModalOpen}
          onCancel={handleModalCancel}
          onOk={onOKClick}
          closable
        >
          <Alert
            message={<strong>Note:</strong>}
            description={
              <p>
                Only users with <em>Viewer/Editor/Q.C</em> access priviledges
                are permitted to be added.
              </p>
            }
            type="warning"
            showIcon
          />

          <center>
            <h4>Select a user to add:</h4>
            <label for="users"></label>

            <select
              id="users"
              className="classic"
              onChange={onUserSelectedChange}
            >
              <option value="none" selected disabled>
                Select a username...
              </option>
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
