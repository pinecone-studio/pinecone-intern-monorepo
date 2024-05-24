import { SuccessIcon } from '../../../assets/icons/SuccessIcon';
import "../_styles/overlayDesign.css"

export const ArchivedSuccessfullyModal = ({ title }: { title: string }) => {
  return (
    <div id="mydiv" className="w-full h-full flex items-center gap-2">
      <div className="shine-round">
        <SuccessIcon />
      </div>
      <div>
        <h3 className="font-semibold text-textPrimary">Archived Successfully</h3>
        <p className='text-container'>{title}</p>
      </div>
    </div>
  );
};