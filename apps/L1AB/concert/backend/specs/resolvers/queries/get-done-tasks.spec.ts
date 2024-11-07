import { getDoneTasksLists } from '../../../src/resolvers/queries';

jest.mock('../../../src/models', () => ({
  Task: {
    find: jest
      .fn()
      .mockResolvedValueOnce([{ taskName: 'Task 1', priority: 1, isDone: true }])
      .mockRejectedValueOnce(new Error('Database Error')),
  },
}));

describe('Get Done Tasks List Query', () => {
  it('Should return all done tasks', async () => {
    const result = await getDoneTasksLists();
    expect(result).toEqual([{ taskName: 'Task 1', priority: 1, isDone: true }]);
  });

  it('Should throw an error when fetching done tasks fails', async () => {
    try {
      await getDoneTasksLists();
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Failed to fetch tasks:');
      } else {
        throw new Error('Unexpected error type');
      }
    }
  });
});
