import { Typography, Space, Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
const { Title } = Typography;

export const MyApprovalsCard = ({ approvalInfo }) => {
  return (
    <>
      <Card
        type="inner"
        title={
          <Title level={5} underline>
            Outstanding Approval: {approvalInfo.approvalRequestName}
          </Title>
        }
        extra={<EyeOutlined key="view-branch" />}
        style={{ width: "80vw" }}
        hoverable
        id="branch_card"
      >
        <strong>
          <p>Requested By: {approvalInfo.branchOwner}</p>
        </strong>
        <p>
          <strong>Requested on: </strong>
          {approvalInfo.approvalSetupDateTime}
        </p>
        <p>
          <strong>Approval request Description: </strong>
          {approvalInfo.approvalPurposeDescription}
        </p>
        <p>
          <strong>Type of approval (edit or create): </strong>
          {approvalInfo.type}
        </p>
        <p>
          <strong>For Guideline: </strong>
          {approvalInfo.guideline.LongTitle}
        </p>
      </Card>
    </>
  );
};
