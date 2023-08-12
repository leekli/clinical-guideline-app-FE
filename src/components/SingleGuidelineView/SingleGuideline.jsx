import "../../styles/SingleGuideline.css";
import { useEffect, useState, useContext } from "react";
import { Card, Space, Collapse, Alert, Table } from "antd";
import {
  FileTextOutlined,
  NumberOutlined,
  CalendarOutlined,
  UnorderedListOutlined,
  ToolOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { getGuidelineById } from "../../utils/api-calls";
import { convertUnixTime } from "../../utils/convertUnixTime";
import { BeatLoader } from "react-spinners";
import { UserContext } from "../../contexts/User";
import NotLoggedInError from "../Errors/NotLoggedIn";
import ErrorPage from "../Errors/ErrorPage";
import { SingleGuidelineEditButton } from "../SingleGuidelineView/SingleGuidelineEditButton";
import { convertJSTime } from "../../utils/convertJSTime";

export const SingleGuideline = () => {
  const { isLoggedIn, loggedInUser } = useContext(UserContext);
  const { guideline_id } = useParams();
  const [guideline, setGuideline] = useState("");
  const [changesList, setChangesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getGuidelineById(guideline_id)
      .then((data) => {
        setGuideline(data.guideline);
        setChangesList([...data.guideline.GuidelineChangeHistoryDescriptions]);
      })
      .then(() => {
        setChangesList((currList) => {
          return currList.map((change) => {
            return {
              ChangeNumber: change.ChangeNumber,
              ChangeDescription: change.ChangeDescription,
              ChangeOwner: change.ChangeOwner,
              ChangeDatePublished: convertJSTime(change.ChangeDatePublished),
            };
          });
        });
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError({ err });
      });
  }, [isError]);

  function handleTrackerClick(event) {
    event.target.classList.toggle("tracker_active");
    let content = event.target.nextElementSibling;

    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  }

  const columns = [
    {
      title: "Change Number",
      dataIndex: "ChangeNumber",
      key: "ChangeNumber",
    },
    {
      title: "Reason for Change",
      dataIndex: "ChangeDescription",
      key: "ChangeDescription",
    },
    {
      title: "Submitted By",
      dataIndex: "ChangeOwner",
      key: "ChangeOwner",
    },
    {
      title: "Date Published",
      dataIndex: "ChangeDatePublished",
      key: "ChangeDatePublished",
    },
  ];

  if (isError) {
    return <ErrorPage />;
  }

  if (isLoggedIn === true && loggedInUser.username !== undefined) {
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
            <h2>
              <FileTextOutlined />
              &nbsp;{guideline.LongTitle}
            </h2>
            <p>
              <strong>
                <CalendarOutlined />
                &nbsp;Published on:{" "}
              </strong>
              {convertUnixTime(guideline.MetadataApplicationProfile.Issued)}
            </p>
            <p>
              <strong>
                <NumberOutlined />
                &nbsp;Current Guideline Version:{" "}
              </strong>
              {guideline.GuidelineCurrentVersion + ".0"}
            </p>
            <div>
              <Space direction="vertical" size={16}>
                <Card
                  size="small"
                  title={
                    <p>
                      <ToolOutlined /> Authoring Tools Available
                    </p>
                  }
                  style={{
                    width: "75vw",
                    backgroundColor: "#e9f4fe",
                    borderColor: "darkgray",
                  }}
                  bordered
                  hoverable
                >
                  <SingleGuidelineEditButton
                    guideline={guideline}
                    setIsError={setIsError}
                  />
                </Card>
              </Space>
            </div>
            <br />
            <div>
              <section>
                <Space
                  direction="vertical"
                  style={{
                    width: "75%",
                  }}
                >
                  <Alert
                    message={<strong>Clinical Guideline</strong>}
                    description={`The Clinical Guideline is listed below. Each section is able to be expanded by clicking the section header.`}
                    type="info"
                    showIcon
                  />
                </Space>
              </section>
            </div>
            <br />
            <br />
            {guideline.Chapters.map((chapter) => {
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
            <br />
            <br />
            <button
              type="button"
              className="collapsible_tracker_history_changes"
              onClick={handleTrackerClick}
            >
              <strong id="trackerTitle">
                <EditOutlined />
                &nbsp;Guideline Change History
              </strong>
            </button>
            <div className="tracker_history_content">
              <p>
                {changesList[0] !== undefined ? (
                  <>
                    <strong>
                      <UnorderedListOutlined />
                      &nbsp;History of changes to this Guideline:
                    </strong>
                    <br />
                    <Space direction="vertical" size={16}>
                      <Table
                        columns={columns}
                        dataSource={changesList}
                        bordered
                        pagination={false}
                        size="large"
                        style={{
                          width: "75vw",
                        }}
                      />
                      <br />
                    </Space>
                  </>
                ) : (
                  <strong>
                    There have been no changes made to this Guideline.
                  </strong>
                )}
              </p>
            </div>
          </>
        );
      } else {
        return (
          <>
            <h2>
              <FileTextOutlined />
              &nbsp;{guideline.LongTitle}
            </h2>
            <p>
              <strong>
                <CalendarOutlined />
                &nbsp;Published on:{" "}
              </strong>
              {convertUnixTime(guideline.MetadataApplicationProfile.Issued)}
            </p>

            <p>
              <strong>
                <NumberOutlined />
                &nbsp;Current Guideline Version:{" "}
              </strong>
              {guideline.GuidelineCurrentVersion + ".0"}
            </p>
            <br />
            <div>
              <section>
                <Space
                  direction="vertical"
                  style={{
                    width: "75%",
                  }}
                >
                  <Alert
                    message={<strong>Clinical Guideline</strong>}
                    description={`The Clinical Guideline is listed below. Each section is able to be expanded by clicking the section header.`}
                    type="info"
                    showIcon
                  />
                </Space>
              </section>
            </div>
            <br />
            {guideline.Chapters.map((chapter) => {
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

            <br />
            <br />

            <button
              type="button"
              className="collapsible_tracker_history_changes"
              onClick={handleTrackerClick}
            >
              <strong id="trackerTitle">
                <EditOutlined />
                &nbsp;Guideline Change History
              </strong>
            </button>
            <div className="tracker_history_content">
              <p>
                {changesList[0] !== undefined ? (
                  <>
                    <strong>
                      <UnorderedListOutlined />
                      &nbsp;History of changes to this Guideline:
                    </strong>
                    <br />
                    <Space direction="vertical" size={16}>
                      <Table
                        columns={columns}
                        dataSource={changesList}
                        bordered
                        pagination={false}
                        size="large"
                        style={{
                          width: "75vw",
                        }}
                      />
                      <br />
                    </Space>
                  </>
                ) : (
                  <strong>
                    There have been no changes made to this Guideline.
                  </strong>
                )}
              </p>
            </div>
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
