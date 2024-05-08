import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { getJobsWithLimit } from '@/graphql/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/job', () => ({
  JobModel: {
    find: jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue([
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
          createdAt: '1714967720317',
          minSalary: '70000',
          maxSalary: '100000',
          status: 'DRAFTED',
        },
      ]),
    }),
  },
}));

const mockData = [
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
    createdAt: '1714967720317',
    minSalary: '70000',
    maxSalary: '100000',
    status: 'DRAFTED',
  },
];

describe('get limited jobs', () => {
  it('should get limited a jobs', async () => {
    try {
      const result = await getJobsWithLimit!({}, { offset: 0, limit: 1 }, {}, {} as GraphQLResolveInfo);

      expect(result).toEqual(mockData);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND));
    }
  });

  it('should return empty jobs', async () => {
    try {
      const result = await getJobsWithLimit!({}, { offset: 1, limit: 2 }, {}, {} as GraphQLResolveInfo);

      expect(result).toEqual([]);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND));
    }
  });
});
