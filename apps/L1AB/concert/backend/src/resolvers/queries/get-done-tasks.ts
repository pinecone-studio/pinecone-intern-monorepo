import { Task } from '../../models';

export const getDoneTasksLists = async () => {
  try {
    const tasks = await Task.find({ isDone: true });
    return tasks;
  } catch (error) {
    throw new Error(`Failed to fetch tasks:`);
  }
};
