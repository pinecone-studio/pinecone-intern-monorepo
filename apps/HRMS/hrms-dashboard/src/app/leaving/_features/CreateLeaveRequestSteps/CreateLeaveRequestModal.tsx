'use client';

import { useContext } from 'react';

import { LeaveRequestCreationContext } from '../../_providers/LeaveRequestCreationProvider';
import { CreateLeaveRequestSucceeded } from './CreateLeaveRequestSucceeded';

export const CreateLeaveRequestModal = () => {
  const { leaveReqStep, stepNumber, isLeaveRequestSucceeded } = useContext(LeaveRequestCreationContext);

  return (
    <dialog data-cy="request-modal" data-testid="leaveRequestModal" id="my_modal_3" className="modal">
      <div className="modal-box bg-white p-[40px]">
        {!isLeaveRequestSucceeded ? (
          <div data-testid="createLeaveRequestModalContainer">
            <form method="dialog">
              <button
                onClick={() => window.location.reload()}
                data-cy="modal-closing-btn"
                data-testid="modalClosingButton"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-[#121316]"
              >
                ✕
              </button>
            </form>
            <div className="gap-[40px] flex flex-col">
              <div className="font-bold text-lg text-[#000000]">Чөлөөний хуудас бөглөх</div>
              <ul className="steps steps-horizontal text-[#121316]">
                <li className="step step-neutral">Ерөнхий</li>
                <li className={`step ${stepNumber == 1 ? 'step-neutral' : ''} ${stepNumber == 2 ? 'step-neutral' : ''}`}>Хугацаа</li>
                <li className={`step ${stepNumber == 2 ? 'step-neutral' : ''}`}>Нэмэлт</li>
              </ul>
              {leaveReqStep}
            </div>
          </div>
        ) : (
          <CreateLeaveRequestSucceeded />
        )}
      </div>
    </dialog>
  );
};
