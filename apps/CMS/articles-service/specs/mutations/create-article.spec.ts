/* eslint-disable no-secrets/no-secrets */
import {  GraphQLResolveInfo } from 'graphql';
import { createArticle } from '../../src/graphql/resolvers/mutations';
import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';

const mockData = {
  title: 'Leap',
  coverPhoto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  content: 'testing content',
  author: '661c68e36837efa536464cb5',
  category: '661c67e66837efa536464cad',
  status: 'String',
  slug: 'thisisSlug',
  commentPermission:false,
}

jest.mock('../../src/models/article.model', () => ({
  articleModel: { create: jest.fn().mockReturnValueOnce({
        title: 'Leap',
        coverPhoto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        content: 'testing content',
        author: '661c68e36837efa536464cb5',
        category: '661c67e66837efa536464cad',
        status: 'String',
        slug: 'thisisSlug',
        commentPermission:false,
      }).mockRejectedValueOnce(null)
  },  
}));

describe('create Article', () => {
  it('should create a article', async () => {
    const result = await createArticle!({}, { articleInput: mockData }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(mockData);
  });
  
  it('qwert', async () => {
    try {
       await createArticle!({}, { articleInput: mockData }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({message: 'cannot created article'},errorTypes.INTERVAL_SERVER_ERROR));
    }
  })
  
});




