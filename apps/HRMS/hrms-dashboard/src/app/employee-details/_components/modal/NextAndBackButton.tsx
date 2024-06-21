import { LeftArrowIcon, RightArrowIcon, RightArrowWhiteIcon } from '../Icons/ModalIcons';

type StepsType = { title: string; content: string }[];

export const NextAndBackButton = ({ steps, currentStep, setCurrentStep }: { steps: StepsType; currentStep: number; setCurrentStep: React.Dispatch<React.SetStateAction<number>> }) => {
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div data-testid="buttons">
      <div className="flex justify-between">
        {currentStep > 0 ? (
          <button onClick={prevStep} className={`flex justify-center items-center h-12 w-12 rounded-full bg-[#F6F6F6] ${currentStep === 0 ? 'cursor-not-allowed' : ''}`} disabled={currentStep === 0}>
            <div className="flex w-6 h-6 items-center justify-center">
              <LeftArrowIcon />
            </div>
          </button>
        ) : (
          <div></div>
        )}
        <div>
          {currentStep < steps.length - 1 ? (
            <button onClick={nextStep} className={`px-4 py-2 h-12 rounded-[8px] bg-[#D6D8DB] ${currentStep === steps.length - 1 ? 'cursor-not-allowed' : ''}`}>
              <div className="flex gap-1 items-center">
                <div className="flex px-1 py-1/2">
                  <p className="text-[#A9ACAF] text-[16px] font-[600] leading-5 tracking-[-0.3px]">Дараах</p>
                </div>
                <div className="w-6 h-6">
                  <RightArrowIcon />
                </div>
              </div>
            </button>
          ) : (
            <button>
              <div className="flex h-12 rounded-[8px] min-w-[80px] px-[16px] py-[12px] bg-[#121316] items-center">
                <div className="px-2 py-1 flex">
                  <p className="text-[#FFF] text-[16px] font-[600] leading-5 tracking-[-0.3px] not-italic">Илгээх</p>
                </div>
                <div className="w-6 h-6">
                  <RightArrowWhiteIcon />
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
