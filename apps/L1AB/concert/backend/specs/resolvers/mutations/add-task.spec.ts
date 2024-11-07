import { addTask } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models', () => ({
  Task: {
    create: jest
      .fn()
      .mockResolvedValueOnce({
        taskName: 'hi',
        priority: 'hi',
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .mockRejectedValueOnce({}),
  },
}));

describe('Add Task Mutation', () => {
  it('Should call addTask mutation with taskName and priority input successfully', async () => {
    const taskName = 'Test Task';
    const priority = 1;

    const result = await addTask({}, { taskName, priority });

    expect(result.taskName).toEqual('hi');
  });

  it('Should call addTask mutation with taskName and priority input with error', async () => {
    const taskName = 'Test Task';
    const priority = 1;

    try {
      await addTask({}, { taskName, priority });
    } catch (error) {
      expect(error).toEqual(new Error('Failed to add task: : <error message>'));
    }
  });
});
