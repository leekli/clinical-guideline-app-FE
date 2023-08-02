import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import {
  Space,
  Button,
  Input,
  Modal,
  Alert,
  message,
  Tooltip,
  Card,
} from "antd";
import {
  SaveOutlined,
  StopOutlined,
  FileImageOutlined,
  InfoCircleOutlined,
  EditOutlined,
  BookOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { patchBranchByBranchName } from "../../utils/api-calls";
import { useNavigate } from "react-router-dom";

export const MySingleGuidelineEditor = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    branchName,
    guidelineTitle,
    currentEditTitle,
    currentChapterIndex,
    currentSectionIndex,
    content,
    title,
  } = location.state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(content);
  const [currentHtml, setCurrentHtml] = useState("");
  const [newTitle, setNewTitle] = useState(title);
  const [imageUrl, setImageUrl] = useState("");
  const [imageCaptionText, setImageCaptionText] = useState("");

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Save successful.",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Error: Save was unsuccessful.",
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const onEditorChange = (event) => {
    const html = String(event);

    setValue(event);
    setCurrentHtml(html);
  };

  const onSaveClick = async (hasImage) => {
    if (hasImage === true) {
      const imageHTMLString = `<div>\r\n<center>\r\n<section>\r\n<img src=\"${imageUrl}\" width=\"300\" />\r\n<br />\r\n<sub>${imageCaptionText}</sub>\r\n</section>\r\n</center>\r\n</div>`;

      await setValue((currValue) => {
        const newHtml = currValue + imageHTMLString;

        return newHtml;
      });
    }

    const bodyToSend = {
      branch_name: branchName,
      chapterNum: currentChapterIndex,
      sectionNum: currentSectionIndex,
      patchBody: currentHtml || value,
      newTitle: newTitle,
    };

    return patchBranchByBranchName(bodyToSend)
      .then(() => {
        success();
        setIsModalOpen(false);
      })
      .catch(() => {
        error();
      });
  };

  const onCancelGoBack = () => {
    navigate(-1);
  };

  const onTitleTextChange = (event) => {
    setNewTitle(event.target.value);
  };

  const onImageUrlTextBoxChange = (event) => {
    setImageUrl(event.target.value);
  };

  const onImageCaptionTextBoxChange = (event) => {
    setImageCaptionText(event.target.value);
  };

  return (
    <>
      {contextHolder}
      <h2>
        <BookOutlined />
        &nbsp;{guidelineTitle}{" "}
      </h2>

      <h3>
        <EditOutlined />
        &nbsp;You are currently editing the Section: {currentEditTitle}{" "}
      </h3>

      <Space wrap>
        <Card
          title="Authoring & Editing Tools"
          bordered={true}
          style={{ borderColor: "darkgray" }}
        >
          <h4 style={{ textAlign: "left" }}>
            <EditOutlined />
            &nbsp;Edit Section Title:
          </h4>
          <Input
            placeholder={newTitle}
            value={newTitle}
            onChange={onTitleTextChange}
            required
            suffix={
              <Tooltip title="This input box allows you to edit/amend the actual sections' Title.">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />

          <h4 style={{ textAlign: "left" }}>
            <EditOutlined />
            &nbsp;Edit Section Content:
          </h4>
          <ReactQuill theme="snow" value={value} onChange={onEditorChange} />

          <div style={{ textAlign: "left" }}>
            <h4>
              <FileImageOutlined />
              &nbsp;Add an Image to this section:
            </h4>
            <Space wrap>
              <Button
                type="primary"
                size="medium"
                icon={<PictureOutlined />}
                style={{
                  background: "seagreen",
                  borderColor: "black",
                }}
                onClick={showModal}
              >
                Add Image & Caption
              </Button>

              <Modal
                title="Add an Image & Caption to this section:"
                open={isModalOpen}
                onCancel={handleModalCancel}
                onOk={() => onSaveClick(true)}
                closable
              >
                <section>
                  <p>
                    <strong>Enter an Image URL Address:</strong>
                  </p>
                  <Input
                    placeholder="Enter Image URL address here..."
                    onChange={onImageUrlTextBoxChange}
                    type="url"
                    required
                    allowClear
                    suffix={
                      <Tooltip title="This should be a full URL/Web Address to an image file">
                        <InfoCircleOutlined
                          style={{ color: "rgba(0,0,0,.45)" }}
                        />
                      </Tooltip>
                    }
                  />
                </section>

                <section>
                  <p>
                    <strong>
                      Create a section of caption text for what will display
                      underneath this Image:
                    </strong>
                  </p>
                  <Input
                    placeholder="Enter Image caption text here..."
                    onChange={onImageCaptionTextBoxChange}
                    required
                    allowClear
                    suffix={
                      <Tooltip title="This is the text which will be placed directly underneath the image, please keep the caption brief.">
                        <InfoCircleOutlined
                          style={{ color: "rgba(0,0,0,.45)" }}
                        />
                      </Tooltip>
                    }
                  />
                </section>

                <br />

                <Alert
                  message={<strong>Note:</strong>}
                  description="By pressing 'OK' - The image link and caption text will be added to the editor view, to save progress you'll need to press the 'Save Progress' button."
                  type="warning"
                  showIcon
                />
              </Modal>
            </Space>
          </div>
        </Card>
      </Space>
      <br />
      <br />
      <Space wrap>
        <Button
          type="primary"
          size="large"
          icon={<SaveOutlined />}
          onClick={() => onSaveClick()}
          style={{
            borderColor: "black",
          }}
        >
          Save Progress
        </Button>

        <Button
          type="primary"
          size="large"
          icon={<StopOutlined />}
          onClick={onCancelGoBack}
          style={{
            borderColor: "black",
          }}
          danger
        >
          Cancel Changes / Go Back
        </Button>
      </Space>
    </>
  );
};
