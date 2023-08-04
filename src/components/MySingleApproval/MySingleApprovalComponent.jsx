import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/User";
import { getApprovalByName } from "../../utils/api-calls";
import { Space, Card } from "antd";
import {
  EyeOutlined,
  UserOutlined,
  CalendarOutlined,
  UnorderedListOutlined,
  BookOutlined,
} from "@ant-design/icons";
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
          <Space wrap>
            <Card
              title="Approval Request Information"
              bordered={true}
              style={{ borderColor: "darkgray", width: "75vw" }}
            >
              <h2>
                <EyeOutlined />
                &nbsp; Pending Approval Request:{" "}
                {singleApproval.approvalRequestName}
              </h2>
              <p>
                <UserOutlined />
                &nbsp;
                <strong>Approval Requested By: </strong>{" "}
                {singleApproval.branchOwner}
              </p>
              <p>
                <CalendarOutlined />
                &nbsp;
                <strong>Approval Requested on: </strong>
                {convertJSTime(singleApproval.approvalSetupDateTime)}
              </p>
              <p>
                <UnorderedListOutlined />
                &nbsp;
                <strong>Approval Request Description: </strong>
                {singleApproval.approvalPurposeDescription}
              </p>
              <p>
                <BookOutlined />
                &nbsp;
                <strong>Approval Request is for Guideline: </strong>
                {singleApproval.guideline.LongTitle}
              </p>
            </Card>
          </Space>
          <br />
          <br />
          <Space wrap>
            <Card
              title="Approval User Tools"
              bordered={true}
              style={{ borderColor: "darkgray", width: "75vw" }}
            >
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
            </Card>
          </Space>
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
