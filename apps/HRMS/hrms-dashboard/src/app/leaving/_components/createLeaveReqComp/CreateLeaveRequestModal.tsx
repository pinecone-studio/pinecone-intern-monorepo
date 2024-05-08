'use client';

import { useContext } from 'react';
import { LeaveRequestCreationContext } from '../../_providers/LeaveRequestCreationProvider';

export const CreateLeaveRequestModal = () => {
  const { leaveReqStep, stepNumber } = useContext(LeaveRequestCreationContext);
  return (
    <dialog data-cy="request-modal" data-testid="leaveRequestModal" id="my_modal_3" className="modal">
      <div className="modal-box p-[40px] ">
        <form method="dialog">
          <button data-cy="modal-closing-btn" data-testid="modalClosingButton" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="gap-[40px] flex flex-col">
          <div className="font-bold text-lg">Чөлөөний хуудас бөглөх</div>
          <ul className="steps steps-horizontal ">
            <li className="step step-neutral">Ерөнхий</li>
            <li className={`step ${stepNumber == 1 ? 'step-neutral' : ''} ${stepNumber == 2 ? 'step-neutral' : ''}`}>Хугацаа</li>
            <li className={`step ${stepNumber == 2 ? 'step-neutral' : ''}`}>Нэмэлт</li>
          </ul>
          {leaveReqStep}
        </div>
      </div>
    </dialog>
  );
};
