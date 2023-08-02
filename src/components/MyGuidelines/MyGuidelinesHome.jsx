import { useEffect, useState, useContext } from "react";
import { getAllBranches } from "../../utils/api-calls";
import { UserContext } from "../../contexts/User";
import { Space, Alert } from "antd";
import { BeatLoader } from "react-spinners";
import NotLoggedInError from "../Errors/NotLoggedIn";
import ErrorPage from "../Errors/ErrorPage";
import { MyGuidelinesBranchCard } from "../MyGuidelines/MyGuidelinesBranchCard";
import { MyGuidelinesCreateNewGuidelineButton } from "./MyGuidelinesCreateNewGuidelineButton";

export const MyGuidelinesHome = () => {
  const { isLoggedIn, loggedInUser } = useContext(UserContext);
  const [guidelineBranches, setGuidelineBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getAllBranches()
      .then((data) => {
        const filteredBranches = data.filter((branch) => {
          if (loggedInUser.primaryAccessLevel.includes("Admin")) {
            return branch;
          }

          if (branch.branchOwner === loggedInUser.username) {
            return branch;
          } else if (
            branch.branchAllowedUsers.includes(loggedInUser.username)
          ) {
            return branch;
          }
        });

        setGuidelineBranches(filteredBranches);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError({ err });
      });
  }, []);

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
      if (guidelineBranches.length === 0) {
        return (
          <>
            <section>
              <Space
                direction="vertical"
                style={{
                  width: "75%",
                }}
              >
                <Alert
                  message={
                    <strong>Welcome to Your Guidelines Workspace Area</strong>
                  }
                  description={`There are currently no Guidelines workspaces available for you to collaborate with.`}
                  type="info"
                  showIcon
                />
              </Space>
            </section>

            <br />

            <section>
              <MyGuidelinesCreateNewGuidelineButton />
            </section>
          </>
        );
      } else {
        return (
          <>
            <section>
              <Space
                direction="vertical"
                style={{
                  width: "75%",
                }}
              >
                <Alert
                  message={
                    <strong>Welcome to Your Guidelines Workspace Area</strong>
                  }
                  description={
                    <p>
                      Any Guideline Workspaces available for you to collaborate
                      with, are listed below. <br></br>
                      <br></br>Once you have accessed a Workspace you wish to
                      collaborate with, more authoring tools and options will be
                      made available to you.
                    </p>
                  }
                  type="info"
                  showIcon
                />
              </Space>
            </section>

            <br />

            <section>
              <MyGuidelinesCreateNewGuidelineButton />
            </section>

            <MyGuidelinesBranchCard guidelineBranches={guidelineBranches} />
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
