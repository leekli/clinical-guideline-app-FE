import { Space, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

export const MySingleGuidelineEditButton = ({
  isBranchLocked,
  titleToEdit,
}) => {
  if (isBranchLocked === false) {
    return (
      <>
        <Space wrap>
          <Button
            type="primary"
            size="large"
            icon={<EditOutlined />}
            style={{
              background: "seagreen",
              borderColor: "black",
            }}
          >
            Edit this chapter: ({titleToEdit})
          </Button>
        </Space>
      </>
    );
  }
};
