import { useState, useContext } from "react";
import { UserContext } from "../../contexts/User";
import { Button, Modal, Input, Alert } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  branchAddNewComment,
  branchUnLockRequest,
  deleteApprovalByName,
} from "../../utils/api-calls";
const { TextArea } = Input;

export const MySingleApprovalRejectionComponent = ({
  branchName,
  approvalName,
}) => {
  const { loggedInUser } = useContext(UserContext);
  const [isRejectCommentModalOpen, setIsRejectCommentModalOpen] =
    useState(false);
  const [rejectionCommentText, setRejectionCommentText] = useState("");
  const navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const showRejectCommentModal = () => {
    setIsRejectCommentModalOpen(true);
  };

  const handleRejectCommentModalCancel = () => {
    setIsRejectCommentModalOpen(false);
  };

  const onTextChange = (event) => {
    setRejectionCommentText(event.target.value);
  };

  const handleRejectionSubmission = () => {
    // 1. Submit/Add the rejection comment to the existing branch
    const dateNow = Date.now();

    const newComment = {
      author: loggedInUser.username,
      body: rejectionCommentText,
      commentDate: dateNow,
    };

    return branchAddNewComment(branchName, { newComment })
      .then(() => {
        // 2. Unlock the existing branch
        return branchUnLockRequest(branchName);
      })
      .then(() => {
        // 3. Delete this approval request
        return deleteApprovalByName(approvalName);
      })
      .then(() => {
        // 4. If successful: Navigate back to Approvals homepage
        routeChange(`/myapprovals`);
      });
  };

  return (
    <>
      <Button
        type="primary"
        size="large"
        icon={<StopOutlined />}
        style={{
          background: "red",
          borderColor: "black",
        }}
        onClick={showRejectCommentModal}
      >
        Reject Approval Request and Add a Justification
      </Button>

      <Modal
        title="Please provide a comment and justification for rejecting this Approval Request:"
        open={isRejectCommentModalOpen}
        onCancel={handleRejectCommentModalCancel}
        onOk={handleRejectionSubmission}
        closable
      >
        <TextArea
          rows={4}
          placeholder="Add comment here..."
          allowClear
          showCount
          onChange={onTextChange}
          required
        />
        <br />
        <br />
        <section>
          <center>
            <Alert
              message={<strong>Next Step:</strong>}
              description={
                <p>
                  Once you have input an approval rejection comment, please
                  confirm by pressing 'OK'.<br></br>
                  <br></br>
                  This Approval Request Workspace will be deleted.<br></br>
                  <br></br>
                  Your Approval Rejection comment will also be added to the
                  Collaborators Workspace, so they have visibility and a reason
                  for their request being rejected.
                </p>
              }
              type="info"
              showIcon
            />
          </center>
        </section>
      </Modal>
    </>
  );
};
