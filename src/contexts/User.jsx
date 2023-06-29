import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(
    {
      username: undefined,
      primaryAccessLevel: undefined,
      secondaryAccessLevel: undefined,
    },
    []
  );

  const isLoggedIn = loggedInUser.username !== undefined;

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, isLoggedIn }}>
      {props.children}
    </UserContext.Provider>
  );
};
