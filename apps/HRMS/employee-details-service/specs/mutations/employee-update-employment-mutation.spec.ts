import { Department, EmploymentStatus } from '@/graphql/generated';
import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import { updateEmployment } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/employee', () => ({
  EmployeeModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockReturnValueOnce({
        _id: '1',
        jobTitle: 'Дизайнер',
        department: 'SOFTWARE',
        dateOfEmployment: '2023-03-09',
        employmentStatus: 'FULL_TIME',
      })
      .mockResolvedValueOnce(undefined)
      .mockReturnValueOnce(null),
  },
}));

const input = {
  jobTitle: 'Дизайнер',
  department: Department.Software,
  employmentStatus: EmploymentStatus.FullTime,
};
describe('update employment', () => {
  it('should update a employment', async () => {
    const result = await updateEmployment!({}, { id: '1', input: input }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      jobTitle: 'Дизайнер',
      department: 'SOFTWARE',
      dateOfEmployment: '2023-03-09',
      employmentStatus: 'FULL_TIME',
    });
  });

  it('should throw an error if the employee cannot be found', async () => {
    try {
      await updateEmployment!({}, { id: '2', input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND));
    }
  });

  it('should throw an error if an error occursnp during employee retrieval', async () => {
    try {
      await updateEmployment!({}, { id: '1', input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
    }
  });
});
