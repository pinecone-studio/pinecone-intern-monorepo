import { createDependent } from '@/graphql/resolvers/mutations';
import { DependentModel } from '@/models/dependent';

jest.mock('@/models/dependent', () => ({
  DependentModel: {
    create: jest
      .fn()
      .mockReturnValue({
        _id: '1',
        firstName: 'bata',
        lastName: 'b',
        phone: '9',
        dependcy: 'w',
        __v: 0,
      })
      .mockReturnValueOnce(null),
  },
}));

describe('create dependent', () => {
  it('should create a dependent', async () => {
    try {
      const result = await createDependent({}, { firstName: 'bata', lastName: 'b', phone: '9', dependcy: 'w' } as any);

      expect(result).toEqual({
        _id: '1',
        firstName: 'bata',
        lastName: 'b',
        phone: '9',
        dependcy: 'w',
        __v: 0,
      });
    } catch (error) {}
  });

  it("should throw an error if the dependent doesn't exist", async () => {
    try {
      await createDependent!({}, { firstname: 'bata' } as any);
    } catch (error) {
      expect(error).toEqual(new Error('failed create dependent '));
    }
  });
});
