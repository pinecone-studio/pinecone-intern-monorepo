import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { makeApolloClient } from '@/common/apollo/index'; // Adjust path as needed

// Mock Apollo Client modules
jest.mock('@apollo/client', () => ({
  ApolloClient: jest.fn(),
  InMemoryCache: jest.fn(),
  HttpLink: jest.fn(),
  ApolloLink: {
    from: jest.fn(),
  },
}));

describe('makeApolloClient', () => {
  const mockApolloClient = {};
  const mockInMemoryCache = {};
  const mockHttpLink = {};
  const mockApolloLinkFrom = {};

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mocks
    (ApolloClient as jest.Mock).mockReturnValue(mockApolloClient);
    (InMemoryCache as jest.Mock).mockReturnValue(mockInMemoryCache);
    (HttpLink as jest.Mock).mockReturnValue(mockHttpLink);
    (ApolloLink.from as jest.Mock).mockReturnValue(mockApolloLinkFrom);
  });

  afterEach(() => {
    delete process.env.API_URL;

    Object.defineProperty(global, 'window', {
      value: window,
      writable: true,
    });
  });

  describe('HttpLink configuration', () => {
    it('should use API_URL from environment variable when available', () => {
      process.env.API_URL = 'http://localhost:4200/api/graphql';

      makeApolloClient();

      expect(HttpLink).toHaveBeenCalledWith({
        uri: 'http://localhost:4200/api/graphql',
      });
    });

    it('should use default localhost URL when API_URL is not set', () => {
      delete process.env.API_URL;

      makeApolloClient();

      expect(HttpLink).toHaveBeenCalledWith({
        uri: 'http://localhost:4200/api/graphql',
      });
    });
  });

  describe('ApolloClient configuration', () => {
    it('should create ApolloClient with InMemoryCache', () => {
      makeApolloClient();

      expect(InMemoryCache).toHaveBeenCalledWith();
      expect(ApolloClient).toHaveBeenCalledWith({
        cache: mockInMemoryCache,
        link: expect.any(Object),
      });
    });

    it('should return the created ApolloClient instance', () => {
      const result = makeApolloClient();

      expect(result).toBe(mockApolloClient);
    });
  });

  describe('Link configuration based on environment', () => {
    it('should use ApolloLink.from with httpLink when window is undefined (server-side)', () => {
      Object.defineProperty(global, 'window', {
        value: undefined,
        writable: true,
      });

      makeApolloClient();

      expect(ApolloLink.from).toHaveBeenCalledWith([mockHttpLink]);
      expect(ApolloClient).toHaveBeenCalledWith({
        cache: mockInMemoryCache,
        link: mockApolloLinkFrom,
      });
    });

    it('should use httpLink directly when window is defined (client-side)', () => {
      Object.defineProperty(global, 'window', {
        value: { document: {} },
        writable: true,
      });

      makeApolloClient();

      expect(ApolloLink.from).not.toHaveBeenCalled();
      expect(ApolloClient).toHaveBeenCalledWith({
        cache: mockInMemoryCache,
        link: mockHttpLink,
      });
    });
  });

  describe('Integration test', () => {
    it('should create a complete Apollo client configuration', () => {
      process.env.API_URL = 'http://localhost:4200/api/graphql';

      const client = makeApolloClient();

      expect(HttpLink).toHaveBeenCalledWith({
        uri: 'http://localhost:4200/api/graphql',
      });
      expect(InMemoryCache).toHaveBeenCalledWith();
      expect(ApolloClient).toHaveBeenCalledWith({
        cache: mockInMemoryCache,
        link: expect.any(Object),
      });
      expect(client).toBe(mockApolloClient);
    });
  });
});
