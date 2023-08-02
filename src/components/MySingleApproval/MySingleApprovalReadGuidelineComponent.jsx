import "../../styles/SingleGuideline.css";
import parse from "html-react-parser";
import { useState } from "react";
import { Button, Modal, Alert } from "antd";
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
              <button
                type="button"
                className="collapsible_chapter"
                onClick={handleClick}
              >
                <strong>{chapter.Title}</strong>
              </button>
              <div className="content">
                {parse(chapter.Content)}
                {chapter.Sections.map((section) => {
                  return (
                    <>
                      <h3 align="left">Sub-section (Click to view):</h3>
                      <button
                        type="button"
                        className="collapsible_section"
                        onClick={handleClick}
                      >
                        <strong>{section.Title}</strong>
                      </button>
                      <div className="content">{parse(section.Content)}</div>
                    </>
                  );
                })}
              </div>
            </>
          );
        })}
      </Modal>
    </>
  );
};
