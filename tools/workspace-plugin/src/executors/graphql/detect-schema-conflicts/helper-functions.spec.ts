import * as fs from 'fs';
import { gql, request } from 'graphql-request';
import { extractSchemaChanges, fetchSchemaDetails, findConflictingNames } from './helper';

jest.mock('fs');
jest.mock('graphql-request');

describe('Helper functions', () => {
  describe('extractSchemaChanges', () => {
    it('should extract schema changes correctly', () => {
      const filePath = 'path/to/file.diff';
      const mockContent = `+ getUser
      type asdf
        + mutation createUser
        + query getUser
        + input CreateUserInput
        + enum Status
      `;
      (fs.readFileSync as jest.Mock).mockReturnValue(mockContent);

      extractSchemaChanges(filePath);

      expect(fs.readFileSync).toHaveBeenCalledWith(filePath, 'utf-8');
    });
  });

  describe('fetchSchemaDetails', () => {
    it('should fetch schema details from the subgraph endpoint', async () => {
      const mockResponse = {
        __schema: {
          types: [{ name: 'User' }, { name: 'Post' }],
          queryType: { fields: [{ name: 'getUser' }, { name: 'getPosts' }] },
          mutationType: { fields: [{ name: 'createUser' }, { name: 'updatePost' }] },
        },
      };
      (request as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchSchemaDetails();

      expect(result).toEqual({
        types: ['User', 'Post'],
        queries: ['getUser', 'getPosts'],
        mutations: ['createUser', 'updatePost'],
      });
      expect(request).toHaveBeenCalledWith(
        'https://int-universal-federation-testing.vercel.app/graphql',
        gql`
          query IntrospectSchema {
            __schema {
              types {
                name
              }
              queryType {
                fields {
                  name
                }
              }
              mutationType {
                fields {
                  name
                }
              }
            }
          }
        `
      );
    });

    it('should handle errors when fetching schema details', async () => {
      const mockError = new Error('Failed to fetch schema details');
      (request as jest.Mock).mockRejectedValue(mockError);

      await expect(fetchSchemaDetails()).rejects.toThrow('Failed to fetch schema details');
    });
  });

  describe('findConflictingNames', () => {
    it('should find conflicting names between existing and changes', () => {
      const existing = {
        types: ['User', 'Post'],
        queries: ['getUser'],
        mutations: ['createUser'],
      };
      const changes = ['User', 'createUser', 'newType'];
      const excludeTypes = ['Query', 'Mutation'];

      const result = findConflictingNames(existing, changes, excludeTypes);

      expect(result).toEqual(['User', 'createUser']);
    });

    it('should return an empty array if no conflicts are found', () => {
      const existing = {
        types: ['User', 'Post'],
        queries: ['getUser'],
        mutations: ['createUser'],
      };
      const changes = ['newType'];
      const excludeTypes = ['Query', 'Mutation'];

      const result = findConflictingNames(existing, changes, excludeTypes);

      expect(result).toEqual([]);
    });

    it('should handle empty existing data', () => {
      const existing = { types: [], queries: [], mutations: [] };
      const changes = ['User', 'createUser'];
      const excludeTypes = ['Query', 'Mutation'];

      const result = findConflictingNames(existing, changes, excludeTypes);

      expect(result).toEqual([]);
    });
  });
});
