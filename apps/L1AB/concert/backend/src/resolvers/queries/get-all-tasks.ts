import { Task } from '../../models';

export const getAllTasks = async () => {
  try {
    const tasks = await Task.find({ isDone: false });
    return tasks;
  } catch (error) {
    throw new Error(`Failed to fetch tasks:`);
  }
};
