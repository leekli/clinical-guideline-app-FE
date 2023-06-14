import { useEffect, useState } from "react";
import { getGuidelines } from "../utils/api-calls";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

export const Homepage = () => {
  const [guidelines, setGuidelines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getGuidelines().then((data) => {
      setGuidelines(data);
      console.log(data[0].LongTitle);
      setIsLoading(false);
    });
  }, []);

  if (isLoading)
    return (
      <div className="loading-section">
        <BeatLoader color="rgb(4,2,39)" size={16} />
        <p>
          <strong>Loading...</strong>
        </p>
      </div>
    );

  return (
    <>
      <h2>Homepage Text</h2>
      <strong>Guidelines:</strong>
      <ul>
        {guidelines.map((guideline) => {
          const guidelinLink = `/guidelines/${guideline.GuidanceNumber}`;
          return (
            <Link to={guidelinLink}>
              <li key={guideline.GuidanceNumber}>{guideline.LongTitle}</li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};
