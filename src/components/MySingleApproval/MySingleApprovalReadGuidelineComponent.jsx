import "../../styles/SingleGuideline.css";
import parse from "html-react-parser";
import { useState } from "react";
import { Button, Modal, Alert, Collapse } from "antd";
import { ReadOutlined } from "@ant-design/icons";

export const MySingleApprovalReadGuidelineComponent = ({ singleApproval }) => {
  const [isGuidelineModalOpen, setIsGuidelineModalOpen] = useState(false);

  const showGuidelineModal = () => {
    setIsGuidelineModalOpen(true);
  };

  const handleGuidelineModalCancel = () => {
    setIsGuidelineModalOpen(false);
  };

  function handleClick(event) {
    event.target.classList.toggle("active");
    let content = event.target.nextElementSibling;

    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  }

  return (
    <>
      <Button
        type="primary"
        size="large"
        icon={<ReadOutlined />}
        style={{
          borderColor: "black",
        }}
        onClick={showGuidelineModal}
      >
        Read Amended Guideline in Full
      </Button>

      <Modal
        title={singleApproval.guideline.LongTitle}
        open={isGuidelineModalOpen}
        onCancel={handleGuidelineModalCancel}
        onOk={handleGuidelineModalCancel}
        width="50%"
        closable
      >
        <Alert
          message={<strong>Note:</strong>}
          description="The full, and amended Guideline is available to view here. All Chapters and sections and viewable by expanding them individually."
          type="info"
          showIcon
        />

        <br></br>
        {singleApproval.guideline.Chapters.map((chapter) => {
          return (
            <>
              <Collapse
                accordion
                bordered={true}
                size="large"
                style={{ borderColor: "darkgray" }}
                items={[
                  {
                    key: "1",
                    label: <strong>{chapter.Title}</strong>,
                    children: (
                      <div>
                        {parse(chapter.Content)}
                        {chapter.Sections.map((section) => {
                          return (
                            <>
                              <Collapse
                                accordion
                                bordered={true}
                                style={{ borderColor: "darkgray" }}
                                items={[
                                  {
                                    key: "1",
                                    label: <strong>{section.Title}</strong>,
                                    children: parse(section.Content),
                                  },
                                ]}
                              />
                            </>
                          );
                        })}
                      </div>
                    ),
                  },
                ]}
              />
            </>
          );
        })}
      </Modal>
    </>
  );
};
