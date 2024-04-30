import { GraphQLResolveInfo } from 'graphql';
import { createJobRecruit } from '@/graphql/resolvers/mutations';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';

jest.mock('@/models/job', () => ({
  JobModel: {
    create: jest
      .fn()
      .mockReturnValueOnce({
        title: 'test',
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
        dueDate: '2024-04-29',
        createdAt: '2024-04-29',
        status: 'DRAFTED',
      })
      .mockRejectedValue(null),
  },
}));

const input = {
  title: 'test',
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
  dueDate: '2024-04-29',
  createdAt: '2024-04-29',
  status: 'DRAFTED',
};

describe('Create Job Recruit', () => {
  it('1. should create a jobRecruit', async () => {
    const result = await createJobRecruit!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      title: 'test',
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
      dueDate: '2024-04-29',
      createdAt: '2024-04-29',
      status: 'DRAFTED',
    });
  });
  it("2. should throw an error if the Job doesn't create", async () => {
    try {
      await createJobRecruit!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
    }
  });
});
