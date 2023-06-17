import { render, screen } from "@testing-library/react";
import { Header } from "../components/Header";
import { UserContext } from "../contexts/User";

test("Should render the header in the header component as a H1 providing a user context", () => {
  render(
    <UserContext.Provider
      value={{ loggedInUser: { username: "joebloggs" }, isLoggedIn: true }}
    >
      <Header />
    </UserContext.Provider>
  );

  const headingElement = screen.getByRole("heading", {
    name: /Clinical Guideline Authoring App/i,
  });
  expect(headingElement).toBeInTheDocument();
});
