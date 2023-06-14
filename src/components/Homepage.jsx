import { useEffect, useState, useContext } from "react";
import { getGuidelines } from "../utils/api-calls";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { UserContext } from "../contexts/User";
import NotLoggedInError from "./NotLoggedIn";

export const Homepage = () => {
  const { isLoggedIn } = useContext(UserContext);
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));
  const [guidelines, setGuidelines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getGuidelines().then((data) => {
      setGuidelines(data);
      setIsLoading(false);
    });
  }, []);

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
        <h2>Homepage Text</h2>
        <strong>Guidelines:</strong>
        <ul>
          {guidelines.map((guideline) => {
            const guidelinLink = `/guidelines/${guideline.GuidanceNumber}`;
            return (
              <Link to={guidelinLink} key={guideline.GuidanceNumber}>
                <li key={guideline.GuidanceNumber}>{guideline.LongTitle}</li>
              </Link>
            );
          })}
        </ul>
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
