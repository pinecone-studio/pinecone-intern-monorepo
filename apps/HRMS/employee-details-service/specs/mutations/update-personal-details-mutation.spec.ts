import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import {personalUpdate } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/employee', () => ({
  EmployeeModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockReturnValueOnce({
        _id: '1',
        firstName: 'bat',
        email: 'bat@gmail.com',
        phone: '90909090',
      })
      .mockResolvedValueOnce(undefined)
      .mockReturnValueOnce(null),
  },
}));

const input = {
  firstName: 'bat',
  email: 'bat@gmail.com',
  phone: '90909090',
};
describe('update employee', () => {
  it('should update a employee', async () => {
    const result = await personalUpdate!({}, { id: '1', input }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      firstName: 'bat',
      email: 'bat@gmail.com',
      phone: '90909090',
    });
  });

  it('should throw an error if the employee cannot be found', async () => {
    try {
      await personalUpdate!({}, { id: '2', input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND));
    }
  });

  it('should throw an error if an error occurs during employee retrieval', async () => {
    try {
      await personalUpdate!({}, { id: '1', input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
    }
  });
});
