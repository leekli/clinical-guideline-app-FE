import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/User";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../utils/api-calls";
import { LoginFormComponent } from "./LoginFormComponent";

export const Login = () => {
  const [userList, setUserList] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const { setLoggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers().then((data) => {
      setUserList(data);
    });
  }, []);

  const routeChange = (path) => {
    navigate(path);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const checkUsername = (userList) => userList.userName === newUsername;

    if (userList.some(checkUsername) === true) {
      userList.forEach((eachUser) => {
        if (eachUser.userName === newUsername) {
          setLoggedInUser({
            username: newUsername,
            primaryAccessLevel: eachUser.primaryAccessLevel,
            secondaryAccessLevel: eachUser.secondaryAccessLevel,
          });
          setNewUsername("");
          routeChange(`/guidelines`);
        }
      });
    } else {
      alert("Username does not exist, please try again");
    }
  };

  return (
    <>
      <main>
        <LoginFormComponent
          newUsername={newUsername}
          setNewUsername={setNewUsername}
          handleSubmit={handleSubmit}
        />
      </main>
    </>
  );
};
