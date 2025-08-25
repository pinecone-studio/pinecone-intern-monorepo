import "@testing-library/jest-dom";
import ProfileButtons from "@/components/profile/ProfileButtons";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

describe("ProfileButtons", () => {
  it("renders Edit Profile, Ad tools, and Settings when isMine = true", () => {
    render(<ProfileButtons isMine={true} isPrivate={false} />);

    expect(screen.getByText("Edit Profile")).toBeInTheDocument();
    expect(screen.getByText("Ad tools")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders Follow and Message when isMine = false and isPrivate = false", () => {
    render(<ProfileButtons isMine={false} isPrivate={false} />);

    expect(screen.getByText("Follow")).toBeInTheDocument();
    expect(screen.getByText("Message")).toBeInTheDocument();
  });

  it("renders Request when isMine = false and isPrivate = true", () => {
    render(<ProfileButtons isMine={false} isPrivate={true} />);

    expect(screen.getByText("Request")).toBeInTheDocument();
  });
});
