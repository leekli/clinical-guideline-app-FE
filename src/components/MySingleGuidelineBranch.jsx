import "../styles/SingleGuideline.css";
import parse from "html-react-parser";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getBranchByBranchName } from "../utils/api-calls";
import { UserContext } from "../contexts/User";
import NotLoggedInError from "./NotLoggedIn";
import { BeatLoader } from "react-spinners";
import { Space, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { convertUnixTime } from "../utils/convertUnixTime";

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
          <p>Branch Name: {branchInfo.branchName}</p>
          <p>Branch Type: {branchInfo.type}</p>
          <p>
            Branch Setup Date/Time - fix meeee!!:{" "}
            {convertUnixTime(branchInfo.branchSetupDateTime)}
          </p>
          <p>Branch Owner: {branchInfo.branchOwners}</p>
          <p>Branch Authorised Users: {branchInfo.branchAllowedUsers}</p>
          <p>
            Branch Currently Locked?...{" "}
            {String(branchInfo.branchLockedForApproval)}
          </p>
          <strong>Guideline below (EDIT BUTTONS BELOW):</strong>

          {branchInfo.guideline.Chapters.map((chapter) => {
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

                  <Space wrap>
                    <Button
                      type="primary"
                      size="large"
                      icon={<EditOutlined />}
                      style={{
                        background: "seagreen",
                        borderColor: "black",
                      }}
                      onClick={() => console.log("clicked")}
                    >
                      Edit this chapter: ({chapter.Title})
                    </Button>
                  </Space>

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
                          <br />

                          <Space wrap>
                            <Button
                              type="primary"
                              size="large"
                              icon={<EditOutlined />}
                              style={{
                                background: "seagreen",
                                borderColor: "black",
                              }}
                              onClick={() => console.log("clicked")}
                            >
                              Edit this section: ({section.Title})
                            </Button>
                          </Space>
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
