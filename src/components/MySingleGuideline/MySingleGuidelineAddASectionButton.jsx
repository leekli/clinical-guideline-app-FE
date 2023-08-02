import { Space, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { branchAddNewSubSection } from "../../utils/api-calls";

export const MySingleGuidelineAddASectionButton = ({
  branchName,
  currentChapterIndex,
  setTriggerReFetch,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "A new sub-section was successfully added to the Guideline.",
    });
  };

  const onAddClick = () => {
    const infoToSend = {
      branch_name: branchName,
      chapterNum: currentChapterIndex,
    };

    return branchAddNewSubSection(infoToSend)
      .then(() => {
        success();
      })
      .then(() => {
        setTimeout(() => {
          return setTriggerReFetch((currValue) => {
            return !currValue;
          });
        }, 3000);
      });
  };

  return (
    <>
      {contextHolder}
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
