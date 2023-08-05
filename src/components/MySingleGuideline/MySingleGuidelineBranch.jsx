import "../../styles/SingleGuideline.css";
import parse from "html-react-parser";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllUsers, getBranchByBranchName } from "../../utils/api-calls";
import { UserContext } from "../../contexts/User";
import NotLoggedInError from "../Errors/NotLoggedIn";
import { BeatLoader } from "react-spinners";
import { Space, Button, Card, Col, Row, Collapse } from "antd";
import { EyeOutlined, AlertOutlined } from "@ant-design/icons";
import { convertJSTime } from "../../utils/convertJSTime";
import { MySingleGuidelineLockUnlock } from "./MySingleGuidelineLockUnlock";
import { MySingleGuidelineEditButton } from "./MySingleGuidelineEditButton";
import { MySingleGuidelineAddUsersButton } from "./MySingleGuidelineAddUsersButton";
import { MyGuidelinesCommentsMain } from "../MyGuidelinesComments/MyGuidelinesCommentsMain";
import { MySingleGuidelineSubmitForApproval } from "./MySingleGuidelineSubmitForApproval";
import ErrorPage from "../Errors/ErrorPage";
import { MySingleGuidelineDeleteWorkspaceButton } from "./MySingleGuidelineDeleteWorkspace";
import { MySingleGuidelineAddASectionButton } from "./MySingleGuidelineAddASectionButton";

export const MySingleGuidelineBranch = () => {
  const { isLoggedIn, loggedInUser } = useContext(UserContext);
  const { branch_name } = useParams();
  const [branchInfo, setBranchInfo] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [triggerReFetch, setTriggerReFetch] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getBranchByBranchName(branch_name)
      .then((data) => {
        setBranchInfo(data);
        setIsLoading(false);
      })
      .then(() => {
        return getAllUsers();
      })
      .then((users) => {
        const filteredPermittedUsers = users.filter((user) => {
          if (user.primaryAccessLevel.includes("Admin")) {
            return user;
          }

          if (
            user.secondaryAccessLevel.includes("Author") ||
            user.secondaryAccessLevel.includes("Editor") ||
            user.secondaryAccessLevel.includes("Q.C") ||
            user.secondaryAccessLevel.includes("Approver")
          ) {
            return user;
          }
        });

        const finalPermittedUsersMinusLoggedInUser =
          filteredPermittedUsers.filter((user) => {
            return user.userName !== loggedInUser.username;
          });

        setAllUsers(finalPermittedUsersMinusLoggedInUser);
      })
      .catch((err) => {
        setIsError({ err });
      });
  }, [isError, triggerReFetch]);

  function handleClick(event) {
    event.target.classList.toggle("active");
    let content = event.target.nextElementSibling;

    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  }

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
      return (
        <>
          <Row gutter={16}>
            <Col span={8}>
              <Card
                title="Workspace Information"
                bordered={true}
                style={{ borderColor: "darkgray" }}
              >
                <p>
                  <strong>Workspace Name: </strong>
                  {branchInfo.branchName.split("-").join(" ")}
                </p>
                <p>
                  <strong>Workspace was set up on: </strong>
                  {convertJSTime(branchInfo.branchSetupDateTime)}
                </p>
                <p>
                  <strong>Workspace Owner: </strong>
                  {branchInfo.branchOwner}
                </p>
                <p>
                  <strong>Workspace was last modified on: </strong>
                  {branchInfo.branchLastModified
                    ? convertJSTime(branchInfo.branchLastModified)
                    : "No amendments have been made to date."}
                </p>
                {branchInfo.type === "create" ? (
                  <p style={{ color: "darkblue" }}>
                    <strong>
                      <AlertOutlined />
                      &nbsp; <u>* Note: This is a newly created Guideline *</u>
                    </strong>
                  </p>
                ) : (
                  ""
                )}
                <p>
                  <strong>Workspace Comments: </strong>
                  There are{" "}
                  <strong>
                    <u>{branchInfo.comments.length}</u>
                  </strong>{" "}
                  comments from collaborators.
                </p>
                <section>
                  <a href="#workspaceComments">
                    <Space wrap>
                      <Button
                        type="primary"
                        size="medium"
                        icon={<EyeOutlined />}
                        style={{
                          background: "seagreen",
                          borderColor: "black",
                        }}
                      >
                        View Collaborator Comments
                      </Button>
                    </Space>
                  </a>
                </section>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title="Workspace Tools"
                bordered={true}
                style={{ borderColor: "darkgray" }}
              >
                <Space wrap>
                  <div
                    style={{
                      borderStyle: "solid",
                      borderColor: "darkgray",
                      backgroundColor: "#F5F5F5",
                      width: "375px",
                      margin: "3px",
                      padding: "8px",
                      borderRadius: "5px",
                    }}
                  >
                    <h4>Current Workspace Collaborators:</h4>
                    <ul
                      style={{
                        listStylePosition: "inside",
                        textAlign: "center",
                      }}
                    >
                      {branchInfo.branchAllowedUsers.map((user) => {
                        return <li key={user}>{user}</li>;
                      })}
                    </ul>
                    <p>
                      <strong>Add additional collaborators...</strong>
                    </p>
                    <MySingleGuidelineAddUsersButton
                      branchName={branchInfo.branchName}
                      allUsers={allUsers}
                      setBranchInfo={setBranchInfo}
                    />
                  </div>
                </Space>
                <br />
                <MySingleGuidelineLockUnlock
                  branchName={branchInfo.branchName}
                  branchLockedForApproval={branchInfo.branchLockedForApproval}
                  setBranchInfo={setBranchInfo}
                />

                <br />
                <section>
                  {branchInfo.branchOwner === loggedInUser.username ||
                  loggedInUser.primaryAccessLevel.includes("Admin") ? (
                    <MySingleGuidelineDeleteWorkspaceButton
                      branchName={branchInfo.branchName}
                    />
                  ) : (
                    ""
                  )}
                </section>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title="Approval Submission"
                bordered={true}
                style={{ borderColor: "darkgray" }}
              >
                <p>
                  <strong>
                    Once this Guideline is ready for final review and approval,
                    submit with the button below:
                  </strong>
                </p>
                <section>
                  <MySingleGuidelineSubmitForApproval
                    branchType={branchInfo.type}
                    branchOwner={branchInfo.branchOwner}
                    branchName={branchInfo.branchName}
                    guideline={branchInfo.guideline}
                  />
                </section>
              </Card>
            </Col>
          </Row>
          <br />
          <Space wrap>
            <Card
              title="Full Guideline"
              bordered={true}
              style={{ borderColor: "darkgray", width: "95vw" }}
            >
              {branchInfo.guideline.Chapters.map((chapter, chapterIndex) => {
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
                              <br />
                              <Link
                                to={`/myguidelines/${branchInfo.branchName}/editor`}
                                state={{
                                  branchName: branchInfo.branchName,
                                  guidelineTitle:
                                    branchInfo.guideline.LongTitle,
                                  currentEditTitle: chapter.Title,
                                  currentChapterIndex: chapterIndex,
                                  currentSectionIndex: 999,
                                  content: chapter.Content,
                                  title: chapter.Title,
                                }}
                              >
                                <MySingleGuidelineEditButton
                                  isBranchLocked={
                                    branchInfo.branchLockedForApproval
                                  }
                                  titleToEdit={chapter.Title}
                                />
                              </Link>

                              {parse(chapter.Content)}
                              {chapter.Sections.map((section, sectionIndex) => {
                                return (
                                  <>
                                    <Collapse
                                      accordion
                                      bordered={true}
                                      style={{ borderColor: "darkgray" }}
                                      items={[
                                        {
                                          key: "1",
                                          label: (
                                            <strong>{section.Title}</strong>
                                          ),
                                          children: (
                                            <div>
                                              <br />

                                              <Link
                                                to={`/myguidelines/${branchInfo.branchName}/editor`}
                                                state={{
                                                  branchName:
                                                    branchInfo.branchName,
                                                  guidelineTitle:
                                                    branchInfo.guideline
                                                      .LongTitle,
                                                  currentEditTitle:
                                                    section.Title,
                                                  currentChapterIndex:
                                                    chapterIndex,
                                                  currentSectionIndex:
                                                    sectionIndex,
                                                  content: section.Content,
                                                  title: section.Title,
                                                }}
                                              >
                                                <MySingleGuidelineEditButton
                                                  isBranchLocked={
                                                    branchInfo.branchLockedForApproval
                                                  }
                                                  titleToEdit={section.Title}
                                                />
                                              </Link>
                                              {parse(section.Content)}
                                            </div>
                                          ),
                                        },
                                      ]}
                                    />
                                  </>
                                );
                              })}
                              <div>
                                <br />
                                <section>
                                  <MySingleGuidelineAddASectionButton
                                    branchName={branchInfo.branchName}
                                    currentChapterIndex={chapterIndex}
                                    setTriggerReFetch={setTriggerReFetch}
                                  />
                                </section>
                                <br />
                              </div>
                            </div>
                          ),
                        },
                      ]}
                    />
                  </>
                );
              })}
            </Card>
          </Space>

          <br />
          <br />
          <hr />
          <section>
            <a id="workspaceComments">
              <h3>Workspace Comments</h3>
            </a>
            <MyGuidelinesCommentsMain branchName={branchInfo.branchName} />
          </section>
        </>
      );
    }
  } else {
    return (
      <>
        <NotLoggedInError />
      </>
    );
  }
};
