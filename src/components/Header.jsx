import "../styles/Header.css";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

export const Header = () => {
  const { isLoggedIn } = useContext(UserContext);
  const username = JSON.parse(localStorage.getItem("username"));
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));

  if (isLoggedIn === true || JSON.parse(LoggedInCheck) === true) {
    return (
      <>
        <header>
          <center>
            <h1>🏥 Clinical Guideline Authoring App</h1>
            <p>
              <img
                src="./images/avatar_icon.png"
                alt="a black outline of a unisex avatar icon"
                width="20"
              />
              &nbsp; You are logged in as: {username}
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
            <h1>🏥 Clinical Guideline Authoring App</h1>
          </center>
        </header>
      </>
    );
  }
};
