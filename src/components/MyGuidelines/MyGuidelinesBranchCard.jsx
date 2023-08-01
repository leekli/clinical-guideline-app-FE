import { Link } from "react-router-dom";
import { Typography, Space, Card } from "antd";
import {
  EyeOutlined,
  FileTextOutlined,
  UserOutlined,
  ToolOutlined,
  ExclamationOutlined,
  AlertOutlined,
} from "@ant-design/icons";
const { Title } = Typography;

export const MyGuidelinesBranchCard = ({ guidelineBranches }) => {
  return (
    <>
      <Space direction="vertical" size={16}>
        {guidelineBranches.map((branch) => {
          const branchLink = `/myguidelines/${branch.branchName}`;

          return (
            <>
              <Card
                type="inner"
                title={
                  <Link to={branchLink} key={branch.branchName}>
                    <Title level={5}>
                      <ToolOutlined />
                      &nbsp;Workspace Name:{" "}
                      {branch.branchName.split("-").join(" ")}
                    </Title>
                  </Link>
                }
                extra={
                  <Link to={branchLink} key={branch.branchName}>
                    <EyeOutlined key="view-branch" />
                    &nbsp;View Guideline Workspace
                  </Link>
                }
                style={{ width: "80vw", borderColor: "darkgray" }}
                hoverable
                id="branch_card"
              >
                <p>
                  <UserOutlined />
                  &nbsp; <strong>Workspace Owner:</strong> {branch.branchOwner}
                </p>

                <p>
                  <FileTextOutlined />
                  &nbsp;<strong>For Guideline: </strong>
                  {branch.guideline.LongTitle}
                </p>
                <p>
                  <ExclamationOutlined />
                  &nbsp;<strong>Workspace Status: </strong>
                  {!branch.branchLockedForApproval
                    ? "✅ Workspace currently Open for amendments"
                    : "❌ Workspace currently Locked for further amendments"}
                </p>
                {branch.type === "create" ? (
                  <p style={{ color: "darkblue" }}>
                    <strong>
                      <AlertOutlined />
                      &nbsp; <u>* Note: This is a newly created Guideline *</u>
                    </strong>
                  </p>
                ) : (
                  ""
                )}
              </Card>
            </>
          );
        })}
      </Space>
    </>
  );
};
