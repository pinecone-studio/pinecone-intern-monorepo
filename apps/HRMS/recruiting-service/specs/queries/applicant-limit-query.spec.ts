import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { getApplicantWithLimit } from '@/graphql/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('@/models/applicant', () => ({
  JobModel: {
    find: jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue([
        {
          id: '1',
          firstname: 'bata22',
          lastname: 'bata',
          email: 'batbold@gmail.com',
          phone: '22121',
          cv: 'hi my',
          status: 'DRAFTED',
        },
      ]),
    }),
  },
}));
const mockData = [
  {
    id: '1',
    firstname: 'bata22',
    lastname: 'bata',
    email: 'batbold@gmail.com',
    phone: '22121',
    cv: 'hi my',
    status: 'DRAFTED',
  },
];
describe('get limited applicants', () => {
  it('should get limited a applicants', async () => {
    try {
      const result = await getApplicantWithLimit!({}, { offset: 0, limit: 1 }, {}, {} as GraphQLResolveInfo);

      expect(result).toEqual(mockData);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND));
    }
  });
  it('should return empty jobs', async () => {
    try {
      const result = await getApplicantWithLimit!({}, { offset: 1, limit: 2 }, {}, {} as GraphQLResolveInfo);
      expect(result).toEqual([]);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND));
    }
  });
});
