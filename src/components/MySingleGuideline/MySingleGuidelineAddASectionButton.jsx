import { Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { branchAddNewSubSection } from "../../utils/api-calls";

export const MySingleGuidelineAddASectionButton = ({
  branchName,
  currentChapterIndex,
  setTriggerReFetch,
}) => {
  const onAddClick = () => {
    const infoToSend = {
      branch_name: branchName,
      chapterNum: currentChapterIndex,
    };

    return branchAddNewSubSection(infoToSend)
      .then(() => {
        alert("New sub section added!");
      })
      .then(() => {
        return setTriggerReFetch((currValue) => {
          return !currValue;
        });
      });
  };

  return (
    <>
      <Space wrap>
        <Button
          type="primary"
          size="medium"
          icon={<PlusOutlined />}
          style={{
            borderColor: "black",
          }}
          onClick={onAddClick}
        >
          &nbsp; Add a New Sub-section
        </Button>
      </Space>
    </>
  );
};
