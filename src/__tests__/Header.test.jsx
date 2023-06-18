import { render, screen } from "@testing-library/react";
import { Header } from "../components/Header";
import { UserContext } from "../contexts/User";

describe("Header component tests", () => {
  test("Should render the header in the header component as a H1 providing an empty user context", () => {
    render(
      <UserContext.Provider
        value={{ loggedInUser: { username: "" }, isLoggedIn: false }}
      >
        <Header />
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
        <Header />
      </UserContext.Provider>
    );

    const headingElement = screen.getByText(/You are logged in as: joebloggs/i);
    expect(headingElement).toBeInTheDocument();
  });
  test("Should render 'You are logged in as X' in the Header component when a valid user context is passed in as 'kelvinball'", () => {
    render(
      <UserContext.Provider
        value={{ loggedInUser: { username: "kelvinball" }, isLoggedIn: true }}
      >
        <Header />
      </UserContext.Provider>
    );

    const loggedInElement = screen.getByText(
      /You are logged in as: kelvinball/i
    );
    expect(loggedInElement).toBeInTheDocument();
  });
  test("Should render the logged in image in the Header component when a valid user context is passed in", () => {
    render(
      <UserContext.Provider
        value={{ loggedInUser: { username: "joebloggs" }, isLoggedIn: true }}
      >
        <Header />
      </UserContext.Provider>
    );

    const loggedInUserAvatar = screen.getByRole("img");
    expect(loggedInUserAvatar).toBeInTheDocument();
    expect(loggedInUserAvatar).toHaveAttribute(
      "src",
      "./images/avatar_icon.png"
    );
    expect(loggedInUserAvatar).toHaveAttribute(
      "alt",
      "a black outline of a unisex avatar icon"
    );
  });
});
