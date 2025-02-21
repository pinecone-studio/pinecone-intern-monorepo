/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
import { crawl } from '../../../src/resolvers/mutations/crawler-mutation';
import { fetchPage, extractLinks } from '../../../src/utils';
import { GraphQLResolveInfo } from 'graphql';

// Mock dependencies
jest.mock('../../../src/utils', () => ({
  fetchPage: jest.fn(),
  extractLinks: jest.fn(),
}));

const mockFetchPage = fetchPage as jest.MockedFunction<typeof fetchPage>;
const mockExtractLinks = extractLinks as jest.MockedFunction<typeof extractLinks>

describe('crawl mutation', () => {
  it('should fetch page and extract links correctly', async () => {
    // ARRANGE
    const testUrl  = 'https://example.com';
    const testHtml = '<a href="/about">About</a><a href="https://example.com/contact">Contact</a>';
    const extractedLinks = new Set(['https://example.com/about', 'https://example.com/contact']);
 
    mockFetchPage.mockResolvedValue(testHtml);
    mockExtractLinks.mockReturnValue(extractedLinks);

    const input = { url: testUrl };
    const mockContext = {} as any;

    // ACT
    const response = await crawl!({}, { input }, mockContext, {} as GraphQLResolveInfo);

    // ASSERT
    expect(mockFetchPage).toHaveBeenCalledWith(testUrl);
    expect(mockExtractLinks).toHaveBeenCalledWith(testHtml, testUrl, 'example.com');

    expect(response).toEqual({
      links: Array.from(extractedLinks),
    });
  });

  it('should return an error if fetchPage fails', async () => {
    // ARRANGE
    const testUrl = 'https://invalid-url.com';
    mockFetchPage.mockResolvedValue(null);

    const input = { url: testUrl };
    const mockContext = {} as any;

    // ACT & ASSERT
    await expect(crawl!({}, { input }, mockContext, {} as GraphQLResolveInfo)).rejects.toThrow(
      `Failed to fetch ${testUrl}`
    );

    expect(mockFetchPage).toHaveBeenCalledWith(testUrl);
    expect(mockExtractLinks).toHaveBeenCalled();
  });
});