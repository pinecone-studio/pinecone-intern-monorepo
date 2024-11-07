import { getAllTasks } from '../../../src/resolvers/queries';

jest.mock('../../../src/models', () => ({
  Task: {
    find: jest
      .fn()
      .mockResolvedValueOnce([{ taskName: 'Task 1', priority: 1, isDone: false }])
      .mockRejectedValueOnce(new Error('Database Error')),
  },
}));

describe('Get All Tasks Query', () => {
  it('Should return all tasks', async () => {
    const result = await getAllTasks();
    expect(result).toEqual([{ taskName: 'Task 1', priority: 1, isDone: false }]);
  });

  it('Should throw an error if fetching tasks fails', async () => {
    try {
      await getAllTasks();
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Failed to fetch tasks:');
      } else {
        throw new Error('Expected an error of type Error');
      }
    }
  });
});
