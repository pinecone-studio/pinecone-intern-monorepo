/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
import { extractLinks } from "../../src/utils/parser";

describe("extractLinks", () => {
  it("should extract valid links from HTML", () => {
    // ARRANGE
    const html = '<a href="/about">About</a><a href="https://example.com/contact">Contact</a>';
    const baseUrl = "https://example.com";
    const domain = "example.com";

    // ACT
    const links = extractLinks(html, baseUrl, domain);

    // ASSERT
    expect(Array.from(links)).toEqual([
      "https://example.com/about",
      "https://example.com/contact",
    ]);
  });

  it("should ignore external links", () => {
    // ARRANGE
    const html = '<a href="https://external.com">External</a>';
    const baseUrl = "https://example.com";
    const domain = "example.com";

    // ACT
    const links = extractLinks(html, baseUrl, domain);

    // ASSERT
    expect(links.size).toBe(0);
  });

  it("should warn and skip invalid URLs", () => {
    // ARRANGE
    const html = '<a href="http://example .com">Invalid</a>';
    const baseUrl = "https://example.com";
    const domain = "example.com";
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {/* intentionally empty */});
    
    // ACT
    const links = extractLinks(html, baseUrl, domain);
    
    // ASSERT
    expect(links.size).toBe(0);
    expect(warnSpy).toHaveBeenCalledWith("Invalid URL skipped: http://example .com");
    warnSpy.mockRestore();
  });
  

  it("should return an empty set if HTML is empty", () => {
    // ACT & ASSERT
    const links = extractLinks("", "https://example.com", "example.com");
    expect(links.size).toBe(0);
  });

  it("should skip anchors with no href attribute", () => {
    // Act==
    const html = "<a>Click me</a>";
    const baseUrl = "https://example.com";
    const domain = "example.com";

    const links = extractLinks(html, baseUrl, domain);
    expect(links.size).toBe(0);
  });
  
});
