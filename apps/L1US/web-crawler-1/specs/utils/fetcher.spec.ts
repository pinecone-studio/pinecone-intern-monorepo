/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
// Mock dependencies
jest.mock("node-fetch", () => jest.fn());

import fetch from "node-fetch";
import { fetchPage } from "../../src/utils/fetcher";

const mockedFetch = fetch as unknown as jest.Mock;

describe("fetchPage", () => {
  beforeEach(() => {
    mockedFetch.mockClear();
  });

  it("should fetch the page content successfully", async () => {
    // ARRANGE
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => "<html></html>",
    });

    const url = "https://example.com";
    // ACT
    const result = await fetchPage(url);
    // ASSERT
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url);
    expect(result).toBe("<html></html>");
  });

  it("should return null if the request fails", async () => {
    // ARRANGE
    mockedFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => "",
    });
    // ACT
    const result = await fetchPage("https://example.com");
    // ASSERT
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toBeNull();
  });
});

