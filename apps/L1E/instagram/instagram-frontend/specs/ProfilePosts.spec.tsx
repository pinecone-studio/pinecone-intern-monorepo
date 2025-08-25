import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProfilePosts from "@/components/profile/ProfilePosts";
import React from "react";

// Properly mock next/image
const MockNextImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />;
MockNextImage.displayName = "NextImage";

jest.mock("next/image", () => MockNextImage);

describe("ProfilePosts (static)", () => {
  it("renders Posts label", () => {
    render(<ProfilePosts />);
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });

  it("renders two <hr> elements", () => {
    render(<ProfilePosts />);
    const hrs = screen.getAllByRole("separator"); 
    expect(hrs).toHaveLength(2);
  });

  it("renders three images with correct src and alt", () => {
    render(<ProfilePosts />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);
    images.forEach((img) => {
      expect(img).toHaveAttribute("src", "/postImage.jpg");
      expect(img).toHaveAttribute("alt", "postImage");
    });
  });
});
