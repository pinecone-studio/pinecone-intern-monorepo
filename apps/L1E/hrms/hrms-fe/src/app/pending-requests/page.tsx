'use client';
import { Input } from '@/components/ui/input';
import { Employee, EmployeeStatus, GetAllRequestsQuery, Request, RequestType, useGetAllRequestsQuery, useMutationMutation } from '@/generated';
import { useState } from 'react';
import StatusSelector from '@/components/StatusSelector';
import { RequestList } from '@/components/RequestList';
import { RequestApproved } from '@/components/RequestApproved';

const employee: Employee = {
  _id: '676e6dd407d5ae05a35cda84',
  email: 'jvk@gmail.com',
  jobTitle: 'senior',
  username: 'jvkaa',
  adminStatus: false,
  remoteLimit: 5,
  paidLeaveLimit: 5,
  freeLimit: 5,
  employeeStatus: EmployeeStatus.Lead,
  createdAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
  updatedAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
};
interface StatusSelectorProp {
  id: string;
  name: string;
  count: number;
  selected: boolean;
}

const Page = () => {
  const { data } = useGetAllRequestsQuery({ variables: { limit: 100 } });
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

  // const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   // If no token found in localStorage, redirect to login page
  //   if (!token) {
  //     router.push('/login');
  //   }
  // }, [router]);

  const allRequests = data?.getAllRequests as GetAllRequestsQuery['getAllRequests'];
  const filteredRequest = allRequests?.filter((e) => e?.leadEmployeeId?._id === employee._id && statuses.some((status) => status.selected && status.id === e.requestType));

  const handleClick = (id: string) => {
    setActiveIndex(id);
    setSelectId(id);
  };
  if (!data) return <div>Loading</div>;

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

  return (
    <div data-cy="pending-page" className="flex flex-col h-screen gap-5 w-screen pt-10 items-center  mx-auto bg-neutral-100 ">
      <div className="w-[1030px] flex flex-col ">
        <div className="text-xl font-semibold">Хүсэлтүүд</div>
        <div className="flex flex-row gap-[220px]">
          <div className="flex flex-col ">
            <div className="flex gap-4 mt-4">
              <Input type="search" placeholder="Хайлт" className="w-[236px] h-[40px] flex absolute pl-9 " />
            </div>
          </div>
          <StatusSelector handleStatusClick={handleStatusClick} selectedStatuses={selectedStatuses} statuses={statuses} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="flex flex-row gap-2">
          <RequestList filteredRequest={filteredRequest as Request[]} handleClick={handleClick} activeIndex={activeIndex} />
          <div className={`${!activeIndex && 'hidden'}`}>
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
              filteredRequest={filteredRequest as Request[]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
