import { deleteEmployee } from '@/graphql/resolvers/mutations';

jest.mock('@/models/employee', () => ({
  EmployeeModel: {
    findByIdAndDelete: jest
      .fn()
      .mockReturnValueOnce({
        id: '1',
        firstName: 'bat',
        lastName: 'dorj',
        phone: '90909090',
        dependency: 'brother',
      })
      .mockReturnValueOnce(null),
  },
}));
describe('delete employee', () => {
  it('should delete an employee', async () => {
    const result = await deleteEmployee!({} as string, { id: '1' });
    expect(result).toEqual({
      id: '1',
      firstName: 'bat',
      lastName: 'dorj',
      phone: '90909090',
      dependency: 'brother',
    });
  });

  it("should throw an error if the dependent doesn't exist", async () => {
    try {
      await deleteEmployee!({} as string, { id: '1' });
    } catch (error) {
      expect(error).toEqual(new Error('failed to delete Employee'));
    }
  });
});
