import "../styles/Homepage.css";
import { useEffect, useState, useContext } from "react";
import { getGuidelines } from "../utils/api-calls";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { UserContext } from "../contexts/User";
import NotLoggedInError from "./NotLoggedIn";
import { Input, Space } from "antd";

export const Homepage = () => {
  const { isLoggedIn } = useContext(UserContext);
  const { Search } = Input;
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));
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

  const onChange = (event) => {
    setSearchInput(event.target.value);
  };

  const onSearch = () => {
    setSearchInput("");
  };

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
        <Space direction="vertical" id="guidelines_search_bar">
          <Search
            placeholder="Search Guidelines..."
            allowClear
            enterButton="Search"
            size="large"
            value={searchInput}
            onChange={onChange}
            onSearch={onSearch}
          />
        </Space>

        <br />
        <br />
        <strong>All Clinical Guidelines:</strong>
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
