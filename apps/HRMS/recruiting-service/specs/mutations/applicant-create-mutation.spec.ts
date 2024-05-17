import { GraphQLResolveInfo } from 'graphql';
import { createApplicant } from '@/graphql/resolvers/mutations';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';

jest.mock('@/models/applicant', () => ({
  ApplicantModel: {
    create: jest
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
      .mockRejectedValue(null),
  },
}));

const input = {
  id: '1',
  firstname: 'bata22',
  lastname: 'bata',
  email: 'batbold@gmail.com',
  phone: '22121',
  cv: 'hi my',
  status: 'DRAFTED',
};

describe('Create Applicant', () => {
  it('1. should create a applicant', async () => {
    const result = await createApplicant!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      id: '1',
      firstname: 'bata22',
      lastname: 'bata',
      email: 'batbold@gmail.com',
      phone: '22121',
      cv: 'hi my',
      status: 'DRAFTED',
    });
  });
  it("2. should throw an error if the Applicant doesn't create", async () => {
    try {
      await createApplicant!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
    }
  });
});
