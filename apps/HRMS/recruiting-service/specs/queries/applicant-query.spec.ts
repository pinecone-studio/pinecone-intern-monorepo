import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { getApplicantById } from '../../src/graphql/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/applicant', () => ({
  ApplicantModel: {
    findById: jest
      .fn()
      .mockReturnValueOnce({
        id: '1',
        firstname: 'bata22',
        lastname: 'bata',
        email: 'batbold@gmail.com',
        phone: '22121',
        cv: 'hi my',
        status: 'DRAFTED',
      })
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(null),
  },
}));

describe('get applicant', () => {
  it('should get a applicant', async () => {
    try {
      const result = await getApplicantById!({}, { applicantId: '1' }, {}, {} as GraphQLResolveInfo);
      expect(result).toEqual({
        id: '1',
        firstname: 'bata22',
        lastname: 'bata',
        email: 'batbold@gmail.com',
        phone: '22121',
        cv: 'hi my',
        status: 'DRAFTED',
      });
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('should throw an error if the applicant cannot be found', async () => {
    try {
      await getApplicantById!({}, { applicantId: '2' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND));
    }
  });

  it("should throw an error if the applicant doesn't exist", async () => {
    try {
      await getApplicantById!({}, { applicantId: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERNAL_SERVER_ERROR));
    }
  });
});
