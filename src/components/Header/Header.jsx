import "../../styles/Header.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";

export const Header = () => {
  const { loggedInUser, isLoggedIn } = useContext(UserContext);

  if (isLoggedIn === true && loggedInUser.username !== undefined) {
    return (
      <>
        <header>
          <center>
            <h1>🏥 Clinical Guideline Authoring App</h1>
            <p>
              <img
                src="../images/avatar_icon.png"
                alt="a black outline of a unisex avatar icon"
                width="20"
              />
              &nbsp; You are logged in as:{" "}
              <strong>{loggedInUser.username}</strong>
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
