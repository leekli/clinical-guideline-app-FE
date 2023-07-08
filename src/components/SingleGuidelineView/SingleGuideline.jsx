import "../../styles/SingleGuideline.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { getGuidelineById } from "../../utils/api-calls";
import { convertUnixTime } from "../../utils/convertUnixTime";
import { BeatLoader } from "react-spinners";
import { UserContext } from "../../contexts/User";
import NotLoggedInError from "../Errors/NotLoggedIn";
import ErrorPage from "../Errors/ErrorPage";
import { SingleGuidelineEditButton } from "../SingleGuidelineView/SingleGuidelineEditButton";

export const SingleGuideline = () => {
  const { isLoggedIn, loggedInUser } = useContext(UserContext);
  const { guideline_id } = useParams();
  const [guideline, setGuideline] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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

            <p>
              <strong>Current Guideline Version: </strong>
              {guideline.GuidelineCurrentVersion + ".0"}
            </p>

            <SingleGuidelineEditButton
              guideline={guideline}
              setIsError={setIsError}
            />

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

            <br />

            <button
              type="button"
              className="collapsible_section_changes"
              onClick={handleClick}
            >
              <strong>Guideline Change History Tracker</strong>
            </button>
            <div className="content">
              <p>
                <strong>Changes made to this guideline:</strong>
              </p>
              {guideline.GuidelineChangeHistoryDescriptions.map((change) => {
                return (
                  <>
                    <hr />
                    <p>Change Number: {change.ChangeNumber}</p>
                    <p>Change Description: {change.ChangeDescription}</p>
                    <p>Change Owner: {change.ChangeOwner}</p>
                    <p>Change Date Published: {change.ChangeDatePublished}</p>
                  </>
                );
              })}
            </div>
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

            <p>
              <strong>Current Guideline Version: </strong>
              {guideline.GuidelineCurrentVersion + ".0"}
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

            <br />

            <button
              type="button"
              className="collapsible_section"
              onClick={handleClick}
            >
              <strong>Guideline Change History Tracker</strong>
            </button>
            <div className="content">
              <hr />
              <p>Each change listed:</p>
              {guideline.GuidelineChangeHistoryDescriptions.map((change) => {
                return (
                  <>
                    <p>Change Number: {change.ChangeNumber}</p>
                    <p>Change Description: {change.ChangeDescription}</p>
                    <p>Change Owner: {change.ChangeOwner}</p>
                    <p>Change Date Published: {change.ChangeDatePublished}</p>
                  </>
                );
              })}
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
