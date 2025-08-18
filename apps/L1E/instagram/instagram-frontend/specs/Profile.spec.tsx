import "@testing-library/jest-dom";
import ProfilePage from "@/app/(main)/profile/page";
import { render, screen } from "@testing-library/react";
import { useAuth } from "@/components/providers/AuthProvider";

jest.mock("@/components/providers/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

describe("ProfilePage (user not null)", () => {
  it("renders Profile component with correct props when user exists", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        isPrivate: false,
        userName: "john_doe",
        bio: "Hello there",
        profileImage: "http://example.com/image.jpg",
        posts: [{ id: "1", image: "pic.jpg", text: "test", createdAt: "2025-08-18", likes: 0, comments: 0, userId: "1" }],
        followers: [{ id: "2", userName: "alice", image: null }],
        following: [{ id: "3", userName: "bob", image: null }],
      },
    });

    render(<ProfilePage />);

    // ✅ Assert profile info is displayed
    expect(screen.getByText("john_doe")).toBeInTheDocument();
    expect(screen.getByText("Hello there")).toBeInTheDocument();
  });
});
