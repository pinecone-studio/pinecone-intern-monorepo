import { crawl } from '../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

const input = {url: 'test'};

const mockContext = {
  req: {}, // Ensure req is included
} as any;

describe('crawl', () => {
  it('crawl', () => {
    const response = crawl!({}, { input }, mockContext, {} as GraphQLResolveInfo);
 
    expect(response).toEqual({ url: 'test' });
  });
});