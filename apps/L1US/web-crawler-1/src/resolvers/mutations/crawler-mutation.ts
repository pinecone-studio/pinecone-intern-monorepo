import { MutationResolvers } from '../../generated';
import { extractLinks, fetchPage } from '../../utils';

export const crawl: MutationResolvers['crawl'] = async (_, { input }) => {
  const { url } = input;

  const html = await fetchPage(url);
  if (!html) {
    throw new Error(`Failed to fetch ${url}`);
  }

  const baseDomain = new URL(url).hostname;
  const links = Array.from(extractLinks(html, url, baseDomain));
  return { links };
};