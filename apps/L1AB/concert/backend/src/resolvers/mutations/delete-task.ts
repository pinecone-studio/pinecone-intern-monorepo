import { Task } from '../../models';

export const deleteTask = async (_: unknown, { taskId }: { taskId: string; taskName?: string; priority?: number; isDone?: boolean }) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      throw new Error('Task not found');
    }
    return deletedTask;
  } catch (error) {
    throw new Error(`Failed to delete task: `);
  }
};
