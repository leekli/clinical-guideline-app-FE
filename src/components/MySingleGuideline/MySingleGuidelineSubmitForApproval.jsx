import { Space, Button, Modal, Input, Alert, Spin } from "antd";
import { useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import {
  branchLockRequest,
  postBranchForApproval,
} from "../../utils/api-calls";
const { TextArea } = Input;
import { useNavigate } from "react-router-dom";

export const MySingleGuidelineSubmitForApproval = ({
  branchType,
  branchOwner,
  branchName,
  guideline,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [approvalDesc, setApprovalDesc] = useState("");
  const [submittingApprovalProgress, setSubmittingApprovalProgress] =
    useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const onDescTextChange = (event) => {
    setApprovalDesc(event.target.value);
  };

  const routeChange = (path) => {
    navigate(path);
  };

  const onApprovalSubmit = () => {
    setSubmittingApprovalProgress(true);
    const bodyToSubmit = {
      type: branchType,
      approvalRequestName: `${guideline.GuidanceNumber}-approval-request`,
      approvalSetupDateTime: Date.now(),
      approvalPurposeDescription: approvalDesc,
      branchName: branchName,
      branchOwner: branchOwner,
      guideline: guideline,
    };

    return postBranchForApproval(bodyToSubmit)
      .then(() => {
        setIsModalOpen(false);
      })
      .then(() => {
        // Lock the branch if successful
        return branchLockRequest(branchName);
      })
      .then(() => {
        setSubmittingApprovalProgress(false);
        routeChange(`/approval-sent`);
      })
      .catch(() => {
        setSubmittingApprovalProgress(false);
      });
  };

  return (
    <>
      <Space wrap>
        <Button
          type="primary"
          size="large"
          icon={<CheckOutlined />}
          style={{
            borderColor: "black",
            margin: "auto",
            width: "175x",
            maxWidth: "100%",
            wordWrap: "break-word",
          }}
          onClick={showModal}
        >
          Submit Guideline
        </Button>

        <Modal
          title="Write a brief description of the purpose for this approval and summary of changes made:"
          open={isModalOpen}
          onCancel={handleModalCancel}
          onOk={onApprovalSubmit}
          closable
          okText="Submit Request"
        >
          <TextArea
            rows={4}
            placeholder="Add description and summary of changes here..."
            allowClear
            showCount
            onChange={onDescTextChange}
            required
          />
          <br />
          {submittingApprovalProgress === true ? (
            <Spin tip="Submitting Approval Request...">
              <div className="content" />
              <br />
            </Spin>
          ) : (
            ""
          )}
          <br />
          <section>
            <center>
              <Alert
                message={<strong>Next Step:</strong>}
                description="Once you have input an approval request description, and summary of Guideline changes, please
      confirm by pressing 'Submit Request'."
                type="info"
                showIcon
              />
            </center>
          </section>
        </Modal>
      </Space>
    </>
  );
};
