import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { getApplicants } from '@/graphql/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/applicant', () => ({
  ApplicantModel: {
    find: jest
      .fn()
      .mockReturnValueOnce([
        {
          id: '664443f4139127a0f1200bf3',
          firstname: 'bata22',
          lastname: 'bata',
          email: 'batbold@gmail.com',
          phone: '22121',
          cv: 'hi my',
          status: 'DRAFTED',
        },
      ])
      .mockRejectedValueOnce(null),
  },
}));

describe('get applicant', () => {
  it('should get all a jobs', async () => {
    const result = await getApplicants!({}, {}, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      {
        id: '664443f4139127a0f1200bf3',
        firstname: 'bata22',
        lastname: 'bata',
        email: 'batbold@gmail.com',
        phone: '22121',
        cv: 'hi my',
        status: 'DRAFTED',
      },
    ]);
  });

  it("should throw an error if the all jobs doesn't exist", async () => {
    try {
      await getApplicants!({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERNAL_SERVER_ERROR));
    }
  });
});
