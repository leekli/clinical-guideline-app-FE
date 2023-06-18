import { render, screen } from "@testing-library/react";
import { Footer } from "../components/Footer.jsx";

describe("Footer component tests", () => {
  test("should render the Developed by p tag in the Footer component", () => {
    render(<Footer />);

    const developedByText = screen.getByText(/Developed by: Lee Kirkham/i);
    expect(developedByText).toBeInTheDocument();
  });
  test("should render the NICE copyright statement in the Footer component", () => {
    render(<Footer />);

    const niceCopyrightText = screen.getByText(
      /© National Institute for Health and Care Excellence 2018/i
    );
    expect(niceCopyrightText).toBeInTheDocument();
  });
  test("should render the NICE logo in the Footer component", () => {
    render(<Footer />);

    const niceLogoImg = screen.getByRole("img");
    expect(niceLogoImg).toBeInTheDocument();
    expect(niceLogoImg).toHaveAttribute(
      "src",
      "/images/nice_landscape_logo.png"
    );
    expect(niceLogoImg).toHaveAttribute(
      "alt",
      "A black and white version of the logo for NICE (National Institute for Health and Care Excellent"
    );
  });
  test("should render the NICE acknowledgement statement as per license agreement in the Footer component", () => {
    render(<Footer />);

    const fullCopyrightText = `This content is made available by NICE (National Institute for Health and Care Excellence) but distributed by a third-party distributor. NICE takes no responsibility for the format in which this content is delivered. The distributor is responsible for incorporating updates from NICE and cannot alter NICE content in any way. Any content delivered alongside content provided by NICE will not necessarily reflect the views of either NICE or those organisations commissioned to develop NICE guidance.`;

    const niceCopyrightText = screen.getByText(fullCopyrightText);

    expect(niceCopyrightText).toBeInTheDocument();
  });
});
