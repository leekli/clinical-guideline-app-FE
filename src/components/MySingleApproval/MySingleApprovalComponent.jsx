import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/User";
import { getApprovalByName } from "../../utils/api-calls";
import { Space } from "antd";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { convertJSTime } from "../../utils/convertJSTime";
import ErrorPage from "../Errors/ErrorPage";
import NotLoggedInError from "../Errors/NotLoggedIn";
import { MySingleApprovalRejectionComponent } from "./MySingleApprovalRejectionComponent";
import { MySingleApprovalAcceptChangesComponent } from "./MySingleApprovalAcceptChangesComponent";
import { MySingleApprovalReadGuidelineComponent } from "./MySingleApprovalReadGuidelineComponent";

export const MySingleApprovalComponent = () => {
  const { isLoggedIn, loggedInUser } = useContext(UserContext);
  const [singleApproval, setSingleApproval] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { approval_name } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getApprovalByName(approval_name)
      .then((data) => {
        setSingleApproval(data);
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
      return (
        <>
          <h2>
            Pending Approval Request: {singleApproval.approvalRequestName}
          </h2>
          <p>Requested by: {singleApproval.branchOwner}</p>
          <p>
            Approval submitted:{" "}
            {convertJSTime(singleApproval.approvalSetupDateTime)}
          </p>
          <p>
            Request Description: {singleApproval.approvalPurposeDescription}
          </p>
          <p>Type of approval (create/edit): {singleApproval.type}</p>
          <p>For Guideline: {singleApproval.guideline.LongTitle}</p>
          <div>
            <Space wrap>
              <MySingleApprovalReadGuidelineComponent
                singleApproval={singleApproval}
              />
            </Space>
          </div>
          <br />
          <div>
            <Space wrap>
              <MySingleApprovalAcceptChangesComponent
                guideline={singleApproval.guideline}
                guidelineId={singleApproval.guideline.GuidanceNumber}
                approvalPurpose={singleApproval.approvalPurposeDescription}
                branchOwner={singleApproval.branchOwner}
                branchName={singleApproval.branchName}
                approvalName={singleApproval.approvalRequestName}
                approvalType={singleApproval.type}
              />
              <MySingleApprovalRejectionComponent
                branchName={singleApproval.branchName}
                approvalName={singleApproval.approvalRequestName}
              />
            </Space>
          </div>
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
