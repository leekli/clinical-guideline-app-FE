import { Link } from "react-router-dom";
import { Typography, Space, Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
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
                    <Title level={5} underline>
                      Edit Workspace Name: {branch.branchName}
                    </Title>
                  </Link>
                }
                extra={
                  <Link to={branchLink} key={branch.branchName}>
                    <EyeOutlined key="view-branch" />
                    &nbsp;View Guideline Workspace
                  </Link>
                }
                style={{ width: "80vw" }}
                hoverable
                id="branch_card"
              >
                <strong>
                  <p>Branch Owner: {branch.branchOwner}</p>
                </strong>
                <p>
                  <strong>Branch Guideline Being Edited:</strong>
                  <br />
                  {branch.guideline.GuidanceNumber}&nbsp;
                  {branch.guideline.LongTitle}
                </p>
              </Card>
            </>
          );
        })}
      </Space>
    </>
  );
};
