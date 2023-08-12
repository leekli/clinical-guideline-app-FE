import { render, screen } from "@testing-library/react";
import { HeaderBar } from "../components/Header/HeaderBar
import { UserContext } from "../contexts/User";

describe("Header component tests", () => {
  test("Should render the header in the header component as a H1 providing an empty user context", () => {
    render(
      <UserContext.Provider
        value={{ loggedInUser: { username: "" }, isLoggedIn: false }}
      >
        <HeaderBar />
      </UserContext.Provider>
    );

    const loggedInElement = screen.getByRole("heading", {
      name: /Clinical Guideline Authoring App/i,
    });
    expect(loggedInElement).toBeInTheDocument();
  });
  test("Should render 'You are logged in as X' in the Header component when a valid user context is passed in as 'joebloggs'", () => {
    render(
      <UserContext.Provider
        value={{ loggedInUser: { username: "joebloggs" }, isLoggedIn: true }}
      >
        <HeaderBar />
      </UserContext.Provider>
    );

    const headingElement = screen.getByText(/Logged in/i);
    expect(headingElement).toBeInTheDocument();
  });
});
