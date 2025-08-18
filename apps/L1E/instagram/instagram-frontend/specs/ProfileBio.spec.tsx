import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProfileBio from "@/components/profile/ProfileBio";

describe("ProfileBio", () => {
  it("renders bio text when provided", () => {
    render(<ProfileBio bio="Hello, this is my bio" />);
    expect(screen.getByText("Hello, this is my bio")).toBeInTheDocument();
  });

  it("renders empty string when bio is null", () => {
    render(<ProfileBio bio={null} />);
    expect(screen.getByText("")).toBeInTheDocument();
  });

  it("renders empty string when bio is undefined", () => {
    render(<ProfileBio bio={undefined} />);
    expect(screen.getByText("")).toBeInTheDocument();
  });
});
