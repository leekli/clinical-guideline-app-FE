import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import { Space, Button } from "antd";
import { SaveOutlined, StopOutlined } from "@ant-design/icons";
import { patchBranchByBranchName } from "../../utils/api-calls";
import { useNavigate } from "react-router-dom";

export const MySingleGuidelineEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    branchName,
    guidelineTitle,
    currentEditTitle,
    currentChapterIndex,
    currentSectionIndex,
    content,
  } = location.state;
  const [value, setValue] = useState(content);
  const [currentHtml, setCurrentHtml] = useState("");

  const onEditorChange = (event) => {
    const html = String(event);

    setValue(event);
    setCurrentHtml(html);
  };

  const onSaveClick = () => {
    const bodyToSend = {
      branch_name: branchName,
      chapterNum: currentChapterIndex,
      sectionNum: currentSectionIndex,
      patchBody: currentHtml,
    };

    patchBranchByBranchName(bodyToSend).then(() => {
      alert("Save successful!");
    });
  };

  const onCancelGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <h2>You are currently editing the Guideline: {guidelineTitle} </h2>

      <h3>
        You are currently editing the chapter/section: {currentEditTitle}{" "}
      </h3>

      <ReactQuill theme="snow" value={value} onChange={onEditorChange} />

      <br />

      <Space wrap>
        <Button
          type="primary"
          size="large"
          icon={<SaveOutlined />}
          onClick={onSaveClick}
        >
          Save Progress
        </Button>

        <Button
          type="primary"
          size="large"
          icon={<StopOutlined />}
          onClick={onCancelGoBack}
          danger
        >
          Cancel Changes and Go Back
        </Button>
      </Space>
    </>
  );
};
