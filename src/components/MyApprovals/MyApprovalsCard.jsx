import { Link } from "react-router-dom";
import { Typography, Card } from "antd";
import {
  EyeOutlined,
  UserOutlined,
  CalendarOutlined,
  UnorderedListOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { convertJSTime } from "../../utils/convertJSTime";
const { Title } = Typography;

export const MyApprovalsCard = ({ approvalInfo }) => {
  const branchLink = `/myapprovals/${approvalInfo.approvalRequestName}`;

  return (
    <>
      <Card
        type="inner"
        title={
          <Link to={branchLink} key={approvalInfo.approvalRequestName}>
            <Title level={5}>
              <EyeOutlined />
              &nbsp;Outstanding Approval: {approvalInfo.approvalRequestName}
            </Title>
          </Link>
        }
        extra={
          <Link to={branchLink} key={approvalInfo.approvalRequestName}>
            <EyeOutlined key="view-approval" />
            &nbsp;View Pending Approval Request
          </Link>
        }
        bordered={true}
        style={{ width: "80vw", borderColor: "darkgray" }}
        hoverable
        id="approval_card"
      >
        <p>
          <UserOutlined />
          &nbsp;
          <strong>Approval Requested By: </strong> {approvalInfo.branchOwner}
        </p>
        <p>
          <CalendarOutlined />
          &nbsp;
          <strong>Approval Requested on: </strong>
          {convertJSTime(approvalInfo.approvalSetupDateTime)}
        </p>
        <p>
          <UnorderedListOutlined />
          &nbsp;
          <strong>Approval Request Description: </strong>
          {approvalInfo.approvalPurposeDescription}
        </p>
        <p>
          <BookOutlined />
          &nbsp;
          <strong>Approval Request is for Guideline: </strong>
          {approvalInfo.guideline.LongTitle}
        </p>
      </Card>
    </>
  );
};
