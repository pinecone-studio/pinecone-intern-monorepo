// apps/L1G/restaurant/restaurant-frontend/specs/common/makeApolloClient.spec.ts
// Impossible to write it by myself copied from https://www.apollographql.com/docs/react/development-testing/testing/#testing-apollo-client
import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { makeApolloClient } from '@/common/apollo/index';

// ─── Mock Apollo Client pieces ────────────────────────────────────────────────
jest.mock('@apollo/client', () => ({
  ApolloClient: jest.fn(),
  InMemoryCache: jest.fn(),
  HttpLink: jest.fn(),
  ApolloLink: { from: jest.fn() },
}));

describe('makeApolloClient', () => {
  const mockApolloClient = {};
  const mockCache = {};
  const mockHttpLink = {};
  const mockLinkFrom = {};

  const originalEnv = process.env;
  const originalWindow = global.window;

  beforeEach(() => {
    // fresh env for every test
    process.env = { ...originalEnv };
    jest.clearAllMocks();

    // mock returns
    (ApolloClient as jest.Mock).mockReturnValue(mockApolloClient);
    (InMemoryCache as jest.Mock).mockReturnValue(mockCache);
    (HttpLink as jest.Mock).mockReturnValue(mockHttpLink);
    (ApolloLink.from as jest.Mock).mockReturnValue(mockLinkFrom);
  });

  afterEach(() => {
    // restore globals
    process.env = originalEnv;
    Object.defineProperty(global, 'window', {
      value: originalWindow,
      writable: true,
    });
  });

  describe('HttpLink URI', () => {
    it('uses BACKEND_URI when it is set', () => {
      process.env.BACKEND_URI = 'https://api.example.com/graphql';

      makeApolloClient();

      expect(HttpLink).toHaveBeenCalledWith({
        uri: 'https://api.example.com/graphql',
      });
    });

    it('falls back to localhost URI when BACKEND_URI is not set', () => {
      delete process.env.BACKEND_URI;

      makeApolloClient();

      expect(HttpLink).toHaveBeenCalledWith({
        uri: 'http://localhost:4200/api/graphql',
      });
    });
  });

  describe('link selection (SSR vs CSR)', () => {
    it('wraps httpLink in ApolloLink.from on the server (no window)', () => {
      // simulate server
      Object.defineProperty(global, 'window', { value: undefined });

      makeApolloClient();

      expect(ApolloLink.from).toHaveBeenCalledWith([mockHttpLink]);
      expect(ApolloClient).toHaveBeenCalledWith({
        cache: mockCache,
        link: mockLinkFrom,
      });
    });

    it('uses httpLink directly in the browser (window defined)', () => {
      Object.defineProperty(global, 'window', {
        value: { document: {} },
        writable: true,
      });

      makeApolloClient();

      expect(ApolloLink.from).not.toHaveBeenCalled();
      expect(ApolloClient).toHaveBeenCalledWith({
        cache: mockCache,
        link: mockHttpLink,
      });
    });
  });

  it('returns the created ApolloClient instance', () => {
    const client = makeApolloClient();
    expect(client).toBe(mockApolloClient);
  });
});
