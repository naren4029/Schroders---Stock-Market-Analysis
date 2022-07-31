import { render, screen } from "@testing-library/react";
import Header from "./header";

describe("renders Header component", () => {
  it("should have anchor element", () => {
    render(<Header />);
    const anchorElement = screen.getByTitle("Schroders");
    expect(anchorElement).toBeInTheDocument();
  });
});
