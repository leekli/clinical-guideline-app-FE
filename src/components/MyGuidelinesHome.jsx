import { useEffect, useState, useContext } from "react";
import { getAllBranches } from "../utils/api-calls";
import { UserContext } from "../contexts/User";
import { BeatLoader } from "react-spinners";
import NotLoggedInError from "./NotLoggedIn";
import ErrorPage from "./ErrorPage";

export const MyGuidelinesHome = () => {
  const { isLoggedIn } = useContext(UserContext);
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));
  const [guidelineBranches, setGuidelineBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getAllBranches()
      .then((data) => {
        setGuidelineBranches(data);
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
    return isLoading ? (
      <div className="loading-section">
        <BeatLoader color="rgb(4,2,39)" size={16} />
        <p>
          <strong>Loading...</strong>
        </p>
      </div>
    ) : (
      <>
        <h2>Live Guidelines In Progress</h2>
        {guidelineBranches.map((guideline) => {
          return (
            <>
              <p>Branch Name: {guideline.branchName}</p>
              <p>Branch Type: {guideline.type}</p>
              <p>Branch Owner: {guideline.branchOwner}</p>
              <p>
                Branch Guideline Being Edited:&nbsp;
                {guideline.guideline.GuidanceNumber}&nbsp;
                {guideline.guideline.LongTitle}
              </p>
            </>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        <NotLoggedInError />
      </>
    );
  }
};
