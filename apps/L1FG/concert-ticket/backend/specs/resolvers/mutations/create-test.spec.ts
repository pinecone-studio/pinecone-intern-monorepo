import { GraphQLResolveInfo } from 'graphql';
import { createTest } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models/test.model', () => ({
  testModel: {
    create: jest.fn().mockReturnValue({
      name: 'zaya',
      email: 'zaya@gmail.com',
      phoneNumber: 98989898,
    }),
  },
}));

describe('example test', () => {
  it('1. example testing', async () => {
    const result = await createTest!({}, { name: 'zaya', email: 'zaya@gmail.com', phoneNumber: 98989898 }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      name: 'zaya',
      email: 'zaya@gmail.com',
      phoneNumber: 98989898,
    });
  });
});
