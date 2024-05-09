import { SuccessIcon } from '../../../assets/icons/SuccessIcon';

export const ArchiveSuccessOverlay = ({ title }: { title: string }) => {
  return (
    <div id="mydiv" className="absolute w-full h-full top-0 left-0 flex items-center pl-4 bg-[#EAF6ED] gap-2">
      <SuccessIcon />
      <div>
        <h3 className="font-semibold text-textPrimary">Archived Successfully</h3>
        <p>{title}</p>
      </div>
    </div>
  );
};
