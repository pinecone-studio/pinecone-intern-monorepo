import { SuccessIcon } from '../../../assets/icons/SuccessIcon';

export const StatusChangedModal = ({ title, status }: { title: string; status: string }) => {
  return (
    <div data-testid="status-change-modal-test-id" className="absolute w-full h-full top-0 left-0 flex items-center pl-4 bg-[#EAF6ED] gap-2">
      <SuccessIcon />
      <div className="relative w-fit p-2 h-[60px]">
        <h3 className=" font-semibold text-textPrimary">{status} successfully</h3>
        <p className="absolute w-full truncate">{title}</p>
      </div>
    </div>
  );
};
