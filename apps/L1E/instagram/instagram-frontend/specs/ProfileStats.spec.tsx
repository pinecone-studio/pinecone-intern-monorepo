import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProfileStats from "@/components/profile/ProfileStats";

describe("ProfileStats", () => {
  it("renders posts, followers, and following counts correctly", () => {
    render(<ProfileStats posts={5} followers={10} following={3} />);

    expect(screen.getByTestId("posts-count")).toHaveTextContent("5 posts");
    expect(screen.getByTestId("followers-count")).toHaveTextContent("10 followers");
    expect(screen.getByTestId("following-count")).toHaveTextContent("3 following");
  });

  it("renders zero counts correctly", () => {
    render(<ProfileStats posts={0} followers={0} following={0} />);

    expect(screen.getByTestId("posts-count")).toHaveTextContent("0 posts");
    expect(screen.getByTestId("followers-count")).toHaveTextContent("0 followers");
    expect(screen.getByTestId("following-count")).toHaveTextContent("0 following");
  });
});
