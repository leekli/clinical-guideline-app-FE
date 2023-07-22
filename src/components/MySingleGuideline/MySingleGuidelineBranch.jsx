import "../../styles/SingleGuideline.css";
import parse from "html-react-parser";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllUsers, getBranchByBranchName } from "../../utils/api-calls";
import { UserContext } from "../../contexts/User";
import NotLoggedInError from "../Errors/NotLoggedIn";
import { BeatLoader } from "react-spinners";
import { Space, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
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

        setAllUsers(filteredPermittedUsers);
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
          <p>Workspace Name: {branchInfo.branchName}</p>
          <p>Workspace Type: {branchInfo.type}</p>
          <p>
            Workspace Setup Date/Time - fix meeee!!:{" "}
            {branchInfo.branchSetupDateTime}
          </p>
          <p>Workspace Owner: {branchInfo.branchOwner}</p>
          Workspace Authorised Users (Permitted to contribute):{" "}
          <ul>
            {branchInfo.branchAllowedUsers.map((user) => {
              return <li>{user}</li>;
            })}
          </ul>
          <MySingleGuidelineAddUsersButton
            branchName={branchInfo.branchName}
            allUsers={allUsers}
            setBranchInfo={setBranchInfo}
          />
          <p>
            Is Workspace Currently Locked?...{" "}
            {!branchInfo.branchLockedForApproval
              ? "✅ Open for edits"
              : "❌ Closed/Locked for edits"}
          </p>
          <MySingleGuidelineLockUnlock
            branchName={branchInfo.branchName}
            branchLockedForApproval={branchInfo.branchLockedForApproval}
            setBranchInfo={setBranchInfo}
          />
          <p>
            Workspace & Guideline Last Modified - fix meeee!!:{" "}
            {branchInfo.branchLastModified || "No Edits yet made"}
          </p>
          <section>
            <MySingleGuidelineSubmitForApproval
              branchType={branchInfo.type}
              branchOwner={branchInfo.branchOwner}
              branchName={branchInfo.branchName}
              guideline={branchInfo.guideline}
            />
          </section>
          <br />
          <section>
            {branchInfo.branchOwner === loggedInUser.username ? (
              <MySingleGuidelineDeleteWorkspaceButton
                branchName={branchInfo.branchName}
              />
            ) : (
              ""
            )}
          </section>
          <br />
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
                  View Collaborator Workspace Comments
                </Button>
              </Space>
            </a>
          </section>
          <strong>Full Guideline below:</strong>
          {branchInfo.guideline.Chapters.map((chapter, chapterIndex) => {
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
                  <br />

                  <Link
                    to={`/myguidelines/${branchInfo.branchName}/editor`}
                    state={{
                      branchName: branchInfo.branchName,
                      guidelineTitle: branchInfo.guideline.LongTitle,
                      currentEditTitle: chapter.Title,
                      currentChapterIndex: chapterIndex,
                      currentSectionIndex: 999,
                      content: chapter.Content,
                      title: chapter.Title,
                    }}
                  >
                    <MySingleGuidelineEditButton
                      isBranchLocked={branchInfo.branchLockedForApproval}
                      titleToEdit={chapter.Title}
                    />
                  </Link>

                  {parse(chapter.Content)}

                  {chapter.Sections.map((section, sectionIndex) => {
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
                          <br />

                          <Link
                            to={`/myguidelines/${branchInfo.branchName}/editor`}
                            state={{
                              branchName: branchInfo.branchName,
                              guidelineTitle: branchInfo.guideline.LongTitle,
                              currentEditTitle: section.Title,
                              currentChapterIndex: chapterIndex,
                              currentSectionIndex: sectionIndex,
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
              </>
            );
          })}
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
