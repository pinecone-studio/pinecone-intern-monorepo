import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { getJobs } from '@/graphql/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/job', () => ({
  JobModel: {
    find: jest
      .fn()
      .mockReturnValueOnce([
        {
          _id: '1',
          title: 'Job Title',
          description: 'Plan and execute marketing strategies.',
          requirements: {
            skill: 'Marketing, Social Media Management',
            education: "Bachelor's degree in Marketing",
            language: 'English, Spanish',
            qualification: 'Marketing Certification',
            workExperience: '5+ years',
            others: 'Strong analytical skills',
          },
          minSalary: '70000',
          maxSalary: '100000',
          status: 'DRAFTED',
        },
      ])
      .mockRejectedValueOnce(null),
  },
}));

describe('get job', () => {
  it('should get all a jobs', async () => {
    const result = await getJobs!({}, {}, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      {
        _id: '1',
        title: 'Job Title',
        description: 'Plan and execute marketing strategies.',
        requirements: {
          skill: 'Marketing, Social Media Management',
          education: "Bachelor's degree in Marketing",
          language: 'English, Spanish',
          qualification: 'Marketing Certification',
          workExperience: '5+ years',
          others: 'Strong analytical skills',
        },
        minSalary: '70000',
        maxSalary: '100000',
        status: 'DRAFTED',
      },
    ]);
  });

  it("should throw an error if the all jobs doesn't exist", async () => {
    try {
      await getJobs!({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERNAL_SERVER_ERROR));
    }
  });
});
