import "../../styles/Header.css";
import { Avatar } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/User";

export const Header = () => {
  const { loggedInUser, isLoggedIn } = useContext(UserContext);
  const [gap, setGap] = useState(2);

  if (isLoggedIn === true && loggedInUser.username !== undefined) {
    return (
      <>
        <header>
          <center>
            <h1>
              🏥 Clinical Guideline Authoring App
              <br /> <em>[🚧 Prototype 🚧]</em>
            </h1>

            <p>
              <Avatar
                style={{
                  backgroundColor: "#041527",
                  verticalAlign: "middle",
                  borderColor: "white",
                  margin: "6px",
                }}
                size="large"
                gap={gap}
              >
                {loggedInUser.username}
              </Avatar>
              &nbsp;
              <strong>
                <LoginOutlined />
                &nbsp;Status:
              </strong>
              &nbsp;Logged in&nbsp;✅
              <br />
            </p>
          </center>
        </header>
      </>
    );
  } else {
    return (
      <>
        <header>
          <center>
            <h1>
              🏥 Clinical Guideline Authoring App
              <br /> <em>[🚧 Prototype 🚧]</em>
            </h1>
          </center>
        </header>
      </>
    );
  }
};
