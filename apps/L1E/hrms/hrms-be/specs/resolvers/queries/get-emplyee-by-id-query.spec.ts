import { GraphQLResolveInfo } from 'graphql';
import { getEmployeeById } from '../../../src/resolvers/queries';
import { EmployeeModel } from '../../../src/models';

jest.mock('../../../src/models', () => ({
  EmployeeModel: {
    findById: jest
      .fn()
      .mockResolvedValueOnce({
        name: 'test',
      })
      .mockResolvedValueOnce(null),
  },
}));

describe('getEmployeeById', () => {
  const context = {
    req: {
      user: { id: '1' },
    },
  };

  it('should get employee', async () => {
    const res = await getEmployeeById!({}, { id: '1' }, context, {} as GraphQLResolveInfo);

    expect(EmployeeModel.findById).toHaveBeenCalledWith('1');
    expect(res).toEqual({
      name: 'test',
    });
  });

  it('should throw an error when no employee is found', async () => {
    await expect(getEmployeeById!({}, { id: '' }, context, {} as GraphQLResolveInfo)).rejects.toThrow('There is no employee with this ID');

    expect(EmployeeModel.findById).toHaveBeenCalledWith('');
  });
});
