import { Task } from '../../models';

export const addTask = async (_: unknown, { taskName, priority }: { taskName: string; priority: number }) => {
  try {
    const newTask = await Task.create({
      taskName,
      priority,
      isDone: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return newTask;
  } catch (error) {
    throw new Error('Failed to add task: : <error message>');
  }
};
