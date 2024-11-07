import { updateTask } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models', () => ({
  Task: {
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        taskName: 'Updated Task',
        priority: 2,
        isDone: true,
        updatedAt: new Date(),
      })
      .mockResolvedValueOnce(null)
      .mockRejectedValueOnce(new Error('Database error')),
  },
}));

describe('Update Task Mutation', () => {
  it('Should update task successfully with taskId, taskName, priority, and isDone', async () => {
    const taskId = '1';
    const taskName = 'Updated Task';
    const priority = 2;
    const isDone = true;

    const result = await updateTask({}, { taskId, taskName, priority, isDone });

    expect(result).toEqual({
      _id: '1',
      taskName: 'Updated Task',
      priority: 2,
      isDone: true,
      updatedAt: expect.any(Date),
    });
  });

  it('Should throw an error if the task is not found', async () => {
    const taskId = '999';
    const taskName = 'Test Task';
    const priority = 1;

    try {
      await updateTask({}, { taskId, taskName, priority });
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Failed to update task: ');
      } else {
        fail('Expected error to be an instance of Error');
      }
    }
  });

  it('Should throw an error if there is a database error', async () => {
    const taskId = '1';
    const taskName = 'Test Task';
    const priority = 1;

    try {
      await updateTask({}, { taskId, taskName, priority });
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Failed to update task: ');
      } else {
        fail('Expected error to be an instance of Error');
      }
    }
  });
});
