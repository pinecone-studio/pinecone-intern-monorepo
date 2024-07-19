import { Input } from '@/components/ui/input';
import { LeftArrowIcon, RightArrowWhiteIcon } from '../Icons/ModalIcons';

export const StepAdditionalInfo = ({
  ladderLevel,
  fileChangeHandler,
  onChangeHandler,
  prevStep,
  imageUrl,
  handleSubmitAI,
  isValidAdditionalInfo,
}: {
  ladderLevel: string;
  fileChangeHandler: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeHandler: (_event: React.ChangeEvent<unknown>) => void;
  prevStep: () => void;
  imageUrl: string;
  handleSubmitAI: () => void;
  isValidAdditionalInfo: boolean;
}) => {
  return (
    <form onSubmit={handleSubmitAI}>
      <div data-testid="additional-info" className="flex gap-4 flex-col">
        <div className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Мэргэжлийн зэрэг'}</label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" name="ladderLevel" value={ladderLevel} onChange={onChangeHandler} />
        </div>
        <div className="flex justify-center items-center">
          <div
            className="relative flex flex-col gap-1 border border-dashed rounded-[10px] w-[200px] h-[200px] justify-center items-center"
            style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <label className=" text-[16px] font-normal text-[#121316]">{'Зураг сонгох'}</label>
            <Input className="absolute cursor-pointer inset-0 opacity-0 h-[200px] px-[8px] py-[8px] bg-[#F7F7F8]" type="file" name="image" onChange={fileChangeHandler} />
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-[48px]">
        <button data-testid="prev-button" onClick={prevStep} className="flex justify-center items-center h-12 w-12 rounded-full bg-[#F6F6F6]">
          <div className="flex w-6 h-6 items-center justify-center">
            <LeftArrowIcon />
          </div>
        </button>
        <button
          data-testid="next-button"
          className={`flex gap-1 items-center px-4 py-2 h-12 rounded-[8px] bg-[#121316] ${isValidAdditionalInfo ? 'opacity-50' : 'opacity-100'}`}
          disabled={isValidAdditionalInfo}
          type="submit"
        >
          <p className="text-white text-[16px] font-[600] leading-5 tracking-[-0.3px]">Илгээх</p>
          <div className="w-6 h-6">
            <RightArrowWhiteIcon />
          </div>
        </button>
      </div>
    </form>
  );
};
