import "../../styles/Homepage.css";
import { useEffect, useState, useContext } from "react";
import { getGuidelines } from "../../utils/api-calls";
import { BeatLoader } from "react-spinners";
import { UserContext } from "../../contexts/User";
import NotLoggedInError from "../Errors/NotLoggedIn";
import { Space } from "antd";
import { AllGuidelinesSearchBar } from "../AllGuidelines/AllGuidelinesSearchBar";
import { AllGuidelinesSingleGuidelineCard } from "../AllGuidelines/AllGuidelinesSingleGuidelineCard";

export const AllGuidelines = () => {
  const { isLoggedIn, loggedInUser } = useContext(UserContext);
  const [guidelines, setGuidelines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setIsError(false);
    getGuidelines(searchInput)
      .then((data) => {
        setGuidelines(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError({ err });
      });
  }, [searchInput]);

  if (isError) {
    return <ErrorPage />;
  }

  if (isLoggedIn === true && loggedInUser.username !== undefined) {
    return isLoading ? (
      <div className="loading-section">
        <BeatLoader color="rgb(4,2,39)" size={16} />
        <p>
          <strong>Loading...</strong>
        </p>
      </div>
    ) : (
      <>
        <AllGuidelinesSearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />

        <br />
        <br />
        <Space direction="vertical" size={16}>
          {guidelines.map((guideline) => {
            const guidelineLink = `/guidelines/${guideline.GuidanceNumber}`;
            return (
              <AllGuidelinesSingleGuidelineCard
                guideline={guideline}
                guidelineLink={guidelineLink}
              />
            );
          })}
        </Space>
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
