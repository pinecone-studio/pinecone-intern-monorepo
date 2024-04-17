import { createEmployee } from '@/graphql/resolvers/mutations';

jest.mock('@/models/employee', () => ({
  EmployeeModel: {
    create: jest
      .fn()
      .mockReturnValueOnce({
        _id: '2',
        firstName: 'bataa',
        lastName: 'od',
        email: 'bataa@gmail.com',
        department: 'SOFTWARE',
      })
      .mockReturnValueOnce(null),
  },
}));

describe('create employee', () => {
  it('should create a employee', async () => {
    const result = await createEmployee!({} as string, { firstName: 'bataa', lastName: 'od', email: 'bataa@gmail.com', department: 'SOFTWARE' });
    expect(result).toEqual({
      _id: '2',
      firstName: 'bataa',
      lastName: 'od',
      email: 'bataa@gmail.com',
      department: 'SOFTWARE',
    });
  });

  it("should throw an error if the dependent doesn't exist", async () => {
    try {
      await createEmployee!({} as string, { firstName: 'bataa', lastName: 'od', email: 'bataa@gmail.com', department: 'SOFTWARE' });
    } catch (error) {
      expect(error).toEqual(new Error('failed create employee'));
    }
  });
});
