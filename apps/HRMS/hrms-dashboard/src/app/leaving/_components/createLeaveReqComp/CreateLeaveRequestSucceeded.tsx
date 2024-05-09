'use client';

import Image from 'next/image';

export const CreateLeaveRequestSucceeded = () => {
  return (
    <div data-cy="LeaveRequestSucceeded" data-testid="LeaveRequestSucceeded">
      <div className="flex justify-between">
        <form method="dialog">
          <button data-cy="modal-closing-btn" data-testid="modalClosingButton" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
      </div>
      <div className="p-[24px] items-center flex flex-col gap-[16px]">
        <div className="w-[60px] h-[60px] bg-red-900">
          <Image src={'/CreateLeaveRequestSucceed.png'} alt="Succeeded" width={60} height={60} />
        </div>
        <div className="text-[18px] font-semibold text-[#121316]">Чөлөөний хүсэлт амжилттай илгээгдлээ</div>
      </div>
    </div>
  );
};
