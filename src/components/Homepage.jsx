import "../styles/Homepage.css";
import { useEffect, useState, useContext } from "react";
import { getGuidelines } from "../utils/api-calls";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { UserContext } from "../contexts/User";
import NotLoggedInError from "./NotLoggedIn";
import { Typography, Input, Space, Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
const { Title } = Typography;

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
        <Space direction="vertical" size={16}>
          {guidelines.map((guideline) => {
            const guidelineLink = `/guidelines/${guideline.GuidanceNumber}`;
            return (
              <>
                <Card
                  type="inner"
                  title={
                    <Link to={guidelineLink} key={guideline.GuidanceNumber}>
                      <Title level={5} underline>
                        {guideline.Title}
                      </Title>
                    </Link>
                  }
                  extra={
                    <Link to={guidelineLink} key={guideline.GuidanceNumber}>
                      <EyeOutlined key="view-guideline" />
                      &nbsp;View Guideline {guideline.GuidanceNumber}
                    </Link>
                  }
                  style={{ width: "80vw" }}
                  hoverable
                  id="guideline_card"
                >
                  <strong>
                    <p>Guideline Number: {guideline.GuidanceNumber}</p>
                  </strong>
                  <p>{guideline.LongTitle}</p>
                </Card>
              </>
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
