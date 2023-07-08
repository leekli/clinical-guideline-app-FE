import { useEffect, useState, useContext } from "react";
import { getAllApprovals } from "../../utils/api-calls";
import ErrorPage from "../Errors/ErrorPage";
import { BeatLoader } from "react-spinners";
import { UserContext } from "../../contexts/User";
import NotLoggedInError from "../Errors/NotLoggedIn";
import { MyApprovalsCard } from "./MyApprovalsCard";
import { Space } from "antd";

export const MyApprovalsHome = () => {
  const { isLoggedIn, loggedInUser } = useContext(UserContext);
  const [allApprovals, setAllApprovals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    getAllApprovals()
      .then((data) => {
        setAllApprovals(data);
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
      if (allApprovals.length === 0) {
        return (
          <>
            <h2>Your Approvals Workspace</h2>
            <h3>You currently have no Approvals in progress at the moment.</h3>
          </>
        );
      } else {
        return (
          <>
            {allApprovals.map((approval) => {
              return (
                <>
                  <Space direction="vertical" size={16}>
                    <MyApprovalsCard approvalInfo={approval} />
                  </Space>
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
