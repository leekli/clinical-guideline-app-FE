import "../../styles/SingleGuideline.css";
import parse from "html-react-parser";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getBranchByBranchName } from "../../utils/api-calls";
import { UserContext } from "../../contexts/User";
import NotLoggedInError from "../Errors/NotLoggedIn";
import { BeatLoader } from "react-spinners";
import { MySingleGuidelineLockUnlock } from "./MySingleGuidelineLockUnlock";
import { MySingleGuidelineEditButton } from "./MySingleGuidelineEditButton";

export const MySingleGuidelineBranch = () => {
  const { isLoggedIn } = useContext(UserContext);
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));
  const { branch_name } = useParams();
  const [branchInfo, setBranchInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getBranchByBranchName(branch_name)
      .then((data) => {
        setBranchInfo(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError({ err });
      });
  }, [isError]);

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
      return (
        <>
          <p>Workspace Name: {branchInfo.branchName}</p>
          <p>Workspace Type: {branchInfo.type}</p>
          <p>
            Workspace Setup Date/Time - fix meeee!!:{" "}
            {branchInfo.branchSetupDateTime}
          </p>
          <p>Workspace Owner: {branchInfo.branchOwners}</p>
          <p>
            Workspace Authorised Users (Permitted to contribute):{" "}
            {branchInfo.branchAllowedUsers}
          </p>
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
                </div>
              </>
            );
          })}
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
