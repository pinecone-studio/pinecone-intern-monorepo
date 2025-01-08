'use client';

import { PiTagThin } from 'react-icons/pi';
import { CiCalendar } from 'react-icons/ci';
import { IoMdTime } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { IoClose } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa6';
import { format } from 'date-fns';
import { Request, RequestType } from '@/generated';
import { ApproveModal } from './ApproveModal';
import { RefuseModal } from './RefuseModal';
import { Dispatch, SetStateAction } from 'react';

interface RequestApprovedProps {
  selectId?: string;
  filteredRequest: Request[];
  buttonReject: () => void;
  buttonApprove: () => void;
  isOpenModalConfirm: boolean;
  onCloseConfirm: () => void;
  onConfirm: () => void;
  isOpenModalRefuse: boolean;
  onCloseRefuse: () => void;
  onRefuse: () => void;
  setRefuseValue: Dispatch<SetStateAction<string | undefined>>;
}
const requestStatus = {
  FREE: 'Чөлөө',
  PAID_LEAVE: 'Цалинтай чөлөө',
  REMOTE: 'Зайнаас ажиллах',
};
const statusMessages = {
  PENDING: 'Хүлээгдэж байна',
  APPROVED: 'Баталгаажсан',
  REJECTED: 'Татгалзсан',
};

export const RequestApproved = ({
  selectId,
  filteredRequest,
  buttonReject,
  buttonApprove,
  isOpenModalConfirm,
  onCloseConfirm,
  onConfirm,
  isOpenModalRefuse,
  onCloseRefuse,
  onRefuse,
  setRefuseValue,
}: RequestApprovedProps) => {
  const request = filteredRequest?.find((e) => e?._id == selectId) as Request;
  return (
    <div className=" flex flex-col w-[608px] bg-white h-[371px] border rounded-xl p-8">
      <div className=" flex flex-row gap-[200px]">
        <div className="flex flex-col gap-[6px]">
          <div className="w-[122px] h-5 border rounded-xl text-xs p-[2px] flex items-center justify-center">{statusMessages[request?.requestType]}</div>
          <div className="text-xl font-semibold">{request?.employeeId?.username}</div>
        </div>
        <div className="flex flex-col ">
          <div className="text-sm font-medium text-[#71717A]">Хүсэлт явуулсан огноо:</div>
          <div className="text-sm font-medium ">{format(request?.createdAt, 'yyyy/MM/dd')}</div>
        </div>
      </div>
      <div className="flex flex-row space-x-24 mt-8 text-xs font-medium text-[#71717A]">
        <div className="flex flex-row gap-2">
          <PiTagThin className="w-4 h-4" />
          <div>Ангилал</div>
        </div>
        <div className="flex flex-row gap-2">
          <CiCalendar className="w-4 h-4" />
          <div>Огноо</div>
        </div>
        <div className="flex flex-row gap-2">
          <IoMdTime className="w-4 h-4" />
          <div>Цаг</div>
        </div>
        <div className="flex flex-row gap-2 ">
          <CiCalendar className="w-4 h-4" />
          <div>Нийт</div>
        </div>
      </div>
      <div className="flex flex-row mt-2 text-xs font-medium text-[#09090B] ">
        <div className="w-[80px] h-8">{requestStatus[request.requestStatus]}</div>
        <div className="ml-[88px] w-[80px]">{request?.selectedDay && format(request?.selectedDay, 'yyyy/MM/dd')}</div>
        <div className="ml-[73px] w-[80px]">
          {request?.startTime}-{request?.endTime}{' '}
        </div>
        <div className="ml-[62px]">1 хоног </div>
      </div>
      <div className="border-b-2 mt-8"></div>
      <div className="text-[#71717A] text-sm font-normal mt-8">Чөлөө авах шалтгаан</div>
      <div className="text-md text-[#09090B] mt-2">{request?.reason}</div>
      <div className={`${request?.requestType == RequestType.Pending ? 'flex' : 'hidden'} flex-row mt-8 gap-2 justify-end`}>
        <Button
          data-testid="buttonReject"
          onClick={() => {
            buttonReject();
          }}
          className="bg-[#F4F4F5] text-[#18181B] gap-[5px]"
        >
          <IoClose />
          <p>Татгалзах</p>
        </Button>
        <Button
          data-testid="buttonApprove"
          onClick={() => {
            buttonApprove();
          }}
          className="gap-2 text-[#FAFAFA] bg-[#18181B] "
        >
          <FaCheck />
          <p>Зөвшөөрөх</p>
        </Button>
      </div>
      <ApproveModal isOpenModal={isOpenModalConfirm} onClose={onCloseConfirm} onConfirm={onConfirm} />
      <RefuseModal setRefuseValue={setRefuseValue} isOpenModal={isOpenModalRefuse} onClose={onCloseRefuse} onConfirm={onRefuse} />
    </div>
  );
};
