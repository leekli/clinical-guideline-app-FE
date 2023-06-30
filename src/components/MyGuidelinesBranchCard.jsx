import { Typography, Space, Card } from "antd";
const { Title } = Typography;

export const MyGuidelinesBranchCard = ({ guidelineBranches }) => {
  return (
    <>
      <Space direction="vertical" size={16}>
        {guidelineBranches.map((guideline) => {
          return (
            <>
              <Card
                type="inner"
                title={
                  <Title level={5} underline>
                    Edit Workspace: {guideline.branchName}
                  </Title>
                }
                style={{ width: "80vw" }}
                hoverable
                id="branch_card"
              >
                <strong>
                  <p>Branch Owner: {guideline.branchOwner}</p>
                </strong>
                <p>
                  <strong>Branch Guideline Being Edited:</strong>
                  <br />
                  {guideline.guideline.GuidanceNumber}&nbsp;
                  {guideline.guideline.LongTitle}
                </p>
              </Card>
            </>
          );
        })}
      </Space>
    </>
  );
};
