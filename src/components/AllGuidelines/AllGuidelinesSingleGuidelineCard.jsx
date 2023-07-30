import { Link } from "react-router-dom";
import { Card, Typography } from "antd";
import {
  EyeOutlined,
  FileTextOutlined,
  NumberOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { convertUnixTime } from "../../utils/convertUnixTime";
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
            <Title level={5}>
              <FileTextOutlined />
              &nbsp;{guideline.Title}
            </Title>
          </Link>
        }
        extra={
          <Link to={guidelineLink} key={guideline.GuidanceNumber}>
            <EyeOutlined key="view-guideline" />
            &nbsp;View Guideline: {guideline.GuidanceNumber}
          </Link>
        }
        style={{ width: "80vw", borderColor: "darkgray" }}
        hoverable
        id="guideline_card"
      >
        <p>
          <strong>
            <NumberOutlined />
            &nbsp;Guideline Number:
          </strong>{" "}
          {guideline.GuidanceNumber}
        </p>
        <p>
          <strong>
            <CalendarOutlined />
            &nbsp;Published on:
          </strong>{" "}
          {convertUnixTime(guideline.MetadataApplicationProfile.Issued)}
        </p>
      </Card>
    </>
  );
};
