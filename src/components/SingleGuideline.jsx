import "../styles/SingleGuideline.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { getGuidelineById, postNewBranch } from "../utils/api-calls";
import { convertUnixTime } from "../utils/convertUnixTime";
import { BeatLoader } from "react-spinners";
import { Space, Button, Modal, Input, Form } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { UserContext } from "../contexts/User";
import NotLoggedInError from "./NotLoggedIn";
import ErrorPage from "./ErrorPage";

export const SingleGuideline = () => {
  const { isLoggedIn, loggedInUser } = useContext(UserContext);
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));
  const { guideline_id } = useParams();
  const [guideline, setGuideline] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBranchName, setIsEditBranchName] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getGuidelineById(guideline_id)
      .then((data) => {
        setGuideline(data.guideline);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError({ err });
      });
  }, [isError]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
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

  const onEditModalTextChange = (event) => {
    setIsEditBranchName(event.target.value);
  };

  const onEditButtonClick = () => {
    const branchEditTitleCopy = editBranchName;
    const branchEditTitleFormatted = branchEditTitleCopy.split(" ").join("-");

    const currentDateTime = String(Date.now());

    const branchToSetup = {
      type: "edit",
      branchName: branchEditTitleFormatted,
      branchSetupDateTime: currentDateTime,
      branchOwner: loggedInUser.username,
      guideline: guideline,
    };

    return postNewBranch(branchToSetup)
      .then(() => {
        setIsModalOpen(false);
        alert("New Branch Successfully submitted!");
      })
      .catch((err) => {
        setIsError({ err });
      });
  };

  if (isError) {
    return <ErrorPage />;
  }

  if (isLoggedIn === true || LoggedInCheck === true) {
    if (isLoading) {
      return (
        <>
          <div className="loading-section">
            <BeatLoader color="rgb(4,2,39)" size={16} />
            <p>
              <strong>Loading...</strong>
            </p>
          </div>
        </>
      );
    } else {
      if (
        loggedInUser.primaryAccessLevel.includes("Admin") ||
        loggedInUser.secondaryAccessLevel.includes("Author") ||
        loggedInUser.secondaryAccessLevel.includes("Editor")
      ) {
        return (
          <>
            <h2>{guideline.LongTitle}</h2>
            <p>
              <strong>Date Issued: </strong>
              {convertUnixTime(guideline.MetadataApplicationProfile.Issued)}
            </p>

            <Space wrap>
              <Button
                type="primary"
                size="large"
                icon={<EditOutlined />}
                style={{ background: "seagreen", borderColor: "black" }}
                onClick={showModal}
              >
                Submit this Guideline for Editing...
              </Button>

              <Modal
                title="Enter an Edit Workspace Title"
                open={isModalOpen}
                onOk={form.submit}
                onCancel={handleModalCancel}
                closable
              >
                <p>
                  Before submitting, please specify what you want to call your
                  'Edit Workspace' for this Guideline:
                </p>
                <Form form={form} onFinish={onEditButtonClick}>
                  <Input
                    placeholder="Enter Title here..."
                    onChange={onEditModalTextChange}
                  />
                </Form>
              </Modal>
            </Space>

            <br />
            <br />

            {guideline.Chapters.map((chapter) => {
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
                          <div className="content">
                            {parse(section.Content)}
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </>
        );
      } else {
        return (
          <>
            <h2>{guideline.LongTitle}</h2>
            <p>
              <strong>Date Issued: </strong>
              {convertUnixTime(guideline.MetadataApplicationProfile.Issued)}
            </p>

            <br />

            {guideline.Chapters.map((chapter) => {
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
                          <div className="content">
                            {parse(section.Content)}
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </>
        );
      }
    }
  } else {
    return (
      <>
        <NotLoggedInError />
      </>
    );
  }
};
