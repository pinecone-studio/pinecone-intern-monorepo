import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { getJobById } from '@/graphql/resolvers/queries';

import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/job', () => ({
  JobModel: {
    findById: jest
      .fn()
      .mockReturnValueOnce({
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
      })
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(null),
  },
}));

describe('get job', () => {
  it('should get a job', async () => {
    const result = await getJobById!({}, { jobId: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
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
    });
  });
  it('should throw an error if the job cannot be found', async () => {
    try {
      await getJobById!({}, { jobId: '2' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND));
    }
  });

  it("should throw an error if the job doesn't exist", async () => {
    try {
      await getJobById!({}, { jobId: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERNAL_SERVER_ERROR));
    }
  });
});
