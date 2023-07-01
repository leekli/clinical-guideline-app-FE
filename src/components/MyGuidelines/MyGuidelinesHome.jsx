import { useEffect, useState, useContext } from "react";
import { getAllBranches } from "../../utils/api-calls";
import { UserContext } from "../../contexts/User";
import { BeatLoader } from "react-spinners";
import NotLoggedInError from "./NotLoggedIn";
import ErrorPage from "./ErrorPage";
import { MyGuidelinesBranchCard } from "./MyGuidelinesBranchCard";

export const MyGuidelinesHome = () => {
  const { isLoggedIn, loggedInUser } = useContext(UserContext);
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));
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
      if (guidelineBranches.length === 0) {
        return (
          <>
            <h2>Your Guidelines Workspace</h2>
            <h3>You currently have no Guidelines in progress to work on.</h3>
          </>
        );
      } else {
        return (
          <>
            <h2>Your Guidelines Workspace</h2>
            <h3>Live Guidelines which you are currently working on:</h3>

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
