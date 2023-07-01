import { Link } from "react-router-dom";
import { Card, Typography } from "antd";
import { EyeOutlined } from "@ant-design/icons";
const { Title } = Typography;

export const AllGuidelinesSingleGuidelineCard = ({
  guideline,
  guidelineLink,
}) => {
  return (
    <>
      <Card
        type="inner"
        title={
          <Link to={guidelineLink} key={guideline.GuidanceNumber}>
            <Title level={5} underline>
              {guideline.Title}
            </Title>
          </Link>
        }
        extra={
          <Link to={guidelineLink} key={guideline.GuidanceNumber}>
            <EyeOutlined key="view-guideline" />
            &nbsp;View Guideline {guideline.GuidanceNumber}
          </Link>
        }
        style={{ width: "80vw" }}
        hoverable
        id="guideline_card"
      >
        <strong>
          <p>Guideline Number: {guideline.GuidanceNumber}</p>
        </strong>
        <p>{guideline.LongTitle}</p>
      </Card>
    </>
  );
};
