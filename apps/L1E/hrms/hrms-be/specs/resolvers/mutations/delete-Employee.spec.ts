import { deleteEmployee } from '../../../src/resolvers/mutations/employee/delete-employee';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../src/models', () => ({
  EmployeeModel: {
    findByIdAndDelete: jest
      .fn()
      .mockReturnValueOnce({
        id: '1',
      })
      .mockReturnValueOnce(null),
  },
}));

describe('Delete Author', () => {
  it('should delete a author', async () => {
    const context = {
      req: {
        user: { id: '1' }, // Mock the user context (adapt as needed)
      },
    };
    const result = await deleteEmployee!({}, { id: '1' }, context, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      id: '1',
    });
  });

  it("should throw an error if the author doesn't exist", async () => {
    const context = {
      req: {
        user: { id: '1' }, // Mock the user context (adapt as needed)
      },
    };
    try {
      await deleteEmployee!({}, { id: '1' }, context, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Employee not found'));
    }
  });
});
