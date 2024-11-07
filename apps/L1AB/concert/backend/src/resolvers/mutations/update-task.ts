import { Task } from '../../models';

export const updateTask = async (_: unknown, { taskId, taskName, priority, isDone }: { taskId: string; taskName?: string; priority?: number; isDone?: boolean }) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        taskName,
        priority,
        isDone,
        updatedAt: new Date(),
      },
      { new: true }
    );
    if (!updatedTask) {
      throw new Error('Task not found');
    }
    return updatedTask;
  } catch (error) {
    throw new Error(`Failed to update task: `);
  }
};
