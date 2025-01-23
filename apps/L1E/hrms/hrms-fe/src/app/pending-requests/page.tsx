'use client';
import { Input } from '@/components/ui/input';
import { GetAllRequestsQuery, Request, RequestType, useGetAllRequestsQuery, useMutationMutation } from '@/generated';
import { ChangeEvent, useState } from 'react';
import StatusSelector from '@/components/StatusSelector';
import { RequestList } from '@/components/RequestList';
import { RequestApproved } from '@/components/RequestApproved';
import { useUser } from '@/provider/UserProvider';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface StatusSelectorProp {
  id: string;
  name: string;
  count: number;
  selected: boolean;
}

const Page = () => {
  const { user } = useUser();
  const employee = user;

  const { data, loading } = useGetAllRequestsQuery({ variables: { limit: 100 } });
  const [refuseValue, setRefuseValue] = useState<string>();
  const [updateRequest] = useMutationMutation();
  const [selectId, setSelectId] = useState<string>('1');
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState<boolean>(false);
  const [isOpenModalRefuse, setIsOpenModalRefuse] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<string | undefined>(undefined);
  const [statuses, setStatuses] = useState<StatusSelectorProp[]>([
    { id: 'APPROVED', name: 'Баталгаажсан', count: 21, selected: true },
    { id: 'PENDING', name: 'Хүлээгдэж байна', count: 21, selected: true },
    { id: 'REJECTED', name: 'Татгалзсан', count: 20, selected: false },
  ]);
  const [datafilter, setDatafilter] = useState<Request[]>();

  const allRequests = data?.getAllRequests as GetAllRequestsQuery['getAllRequests'];
  const filteredRequest = allRequests?.filter((e) => e?.leadEmployeeId?._id === employee?._id && statuses.some((status) => status.selected && status.id === e?.requestType));

  const handleClick = (id: string) => {
    setActiveIndex(id);
    setSelectId(id);
  };
  if (loading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  const handleStatusClick = (id: string) => {
    setStatuses((prevStatuses) => prevStatuses.map((status) => (status.id === id ? { ...status, selected: !status.selected } : status)));
  };

  const selectedStatuses = statuses.filter((status) => status.selected);

  const buttonReject = () => {
    setIsOpenModalRefuse(true);
  };

  const buttonApprove = () => {
    setIsOpenModalConfirm(true);
  };

  const onConfirm = async () => {
    const update = new Date();

    await updateRequest({ variables: { updateRequestId: selectId, input: { updatedAt: update.toString(), reasonRefuse: '', requestType: RequestType.Approved } } });
  };
  const onRefuse = async () => {
    const update = new Date();

    await updateRequest({ variables: { updateRequestId: selectId, input: { updatedAt: update.toString(), reasonRefuse: refuseValue, requestType: RequestType.Rejected } } });
  };

  const handlechange = (value: string) => {
    const filtereddata = filteredRequest?.filter((e) => e?.employeeId?.username.includes(value)) as Request[];

    if (filtereddata.length == 0) {
      setActiveIndex(undefined);
      setDatafilter([]);
    } else {
      setDatafilter(filtereddata);
    }
  };

  return (
    <div data-cy="pending-page" className="flex flex-col h-screen gap-5 w-screen pt-10 items-center  mx-auto bg-neutral-100 ">
      <div className="w-[1030px] flex flex-col ">
        <div className="text-xl font-semibold">Хүсэлтүүд</div>
        <div className="flex flex-row gap-[220px]">
          <div className="flex flex-col ">
            <div className="flex gap-4 mt-4">
              <Input
                data-cy="handlechange"
                data-testid="handlechange"
                type="search"
                placeholder="Хайлт"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handlechange(e.target.value)}
                className="w-[236px] h-[40px] flex absolute pl-9 "
              />
            </div>
          </div>
          <StatusSelector handleStatusClick={handleStatusClick} selectedStatuses={selectedStatuses} statuses={statuses} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="flex flex-row gap-2">
          <RequestList filteredRequest={datafilter ? datafilter : (filteredRequest as Request[])} handleClick={handleClick} activeIndex={activeIndex} />
          <div data-testid="modal" className={`${!activeIndex && 'hidden'}`}>
            <RequestApproved
              selectId={selectId}
              buttonApprove={buttonApprove}
              buttonReject={buttonReject}
              isOpenModalConfirm={isOpenModalConfirm}
              onCloseConfirm={() => setIsOpenModalConfirm(false)}
              onConfirm={onConfirm}
              isOpenModalRefuse={isOpenModalRefuse}
              onCloseRefuse={() => {
                setIsOpenModalRefuse(false);
              }}
              setRefuseValue={setRefuseValue}
              onRefuse={onRefuse}
              filteredRequest={datafilter ? datafilter : (filteredRequest as Request[])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
