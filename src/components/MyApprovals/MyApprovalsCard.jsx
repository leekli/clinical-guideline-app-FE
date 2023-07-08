import { Link } from "react-router-dom";
import { Typography, Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
const { Title } = Typography;

export const MyApprovalsCard = ({ approvalInfo }) => {
  const branchLink = `/myapprovals/${approvalInfo.approvalRequestName}`;

  return (
    <>
      <Card
        type="inner"
        title={
          <Link to={branchLink} key={approvalInfo.approvalRequestName}>
            <Title level={5} underline>
              Outstanding Approval: {approvalInfo.approvalRequestName}
            </Title>
          </Link>
        }
        extra={
          <Link to={branchLink} key={approvalInfo.approvalRequestName}>
            <EyeOutlined key="view-approval" />
            &nbsp;View Pending Approval Request
          </Link>
        }
        style={{ width: "80vw" }}
        hoverable
        id="approval_card"
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
