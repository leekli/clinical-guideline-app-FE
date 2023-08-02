import { useEffect, useState, useContext } from "react";
import { getAllApprovals } from "../../utils/api-calls";
import ErrorPage from "../Errors/ErrorPage";
import { BeatLoader } from "react-spinners";
import { UserContext } from "../../contexts/User";
import NotLoggedInError from "../Errors/NotLoggedIn";
import { MyApprovalsCard } from "./MyApprovalsCard";
import { Space, Alert } from "antd";

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
            <section>
              <Space
                direction="vertical"
                style={{
                  width: "75%",
                }}
              >
                <Alert
                  message={
                    <strong>Welcome to Your Approvals Workspace Area</strong>
                  }
                  description={`There are currently no Guidelines requiring or pending for approval right now.`}
                  type="info"
                  showIcon
                />
              </Space>
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
                    <strong>Welcome to Your Approvals Workspace Area</strong>
                  }
                  description={
                    <p>
                      Any Guidelines which are pending for review and approval,
                      are listed below.<br></br>
                      <br></br>Once you have accessed an Approval Request, more
                      tools will be made available to you.
                    </p>
                  }
                  type="info"
                  showIcon
                />
              </Space>
            </section>
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
