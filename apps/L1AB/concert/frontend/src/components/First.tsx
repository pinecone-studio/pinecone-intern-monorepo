'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAddTaskMutation } from '@/generated';

import { useState } from 'react';

export const First = ({ refetch }: { refetch: () => void }) => {
  const [addTask] = useAddTaskMutation();
  const [taskName, setTaskName] = useState<string>('');
  const [priority, setPriority] = useState<number | ''>(''); // State for priority
  const [dailog, setDialog] = useState(false);

  const handleAddTask = async () => {
    if (taskName && priority) {
      await addTask({
        variables: { taskName, priority },
      });
      await refetch();

      setDialog(false);
      setTaskName('');
      setPriority('');
    } else {
      alert('Please fill in both the task name and priority.');
    }
  };

  return (
    <div className="flex justify-end">
      <Dialog open={dailog}>
        <DialogTrigger onClick={() => setDialog(true)}>
          <div className="text-white bg-[#00A300] px-5 py-3 w-fit rounded-lg">Add Task</div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-white">ADD TASK</DialogTitle>
            <DialogDescription className="text-white p-5 flex flex-col gap-6">
              <div>
                <label>Task Name</label>
                <input className="w-full border border-white bg-[#1A1A1A] h-8 rounded-sm text-white" value={taskName} onChange={(event) => setTaskName(event.target.value)} />
              </div>
              <div>
                <label>Priority</label>
                <input type="number" className="w-full border border-white bg-[#1A1A1A] h-8 rounded-sm text-white" value={priority} onChange={(event) => setPriority(Number(event.target.value))} />
              </div>

              <div className="text-white bg-[#00A300] px-5 py-3 w-fit rounded-lg self-end cursor-pointer" onClick={handleAddTask}>
                Add Task
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
