interface ProgressProps {
  progressValue: number;
}

const ProgressBar = ({ progressValue }: ProgressProps) => {
  return (
    <div data-testid="progress-bar" className="rounded-full w-2/3 h-[8px] bg-[#ECEDF0] relative">
      <span data-testid="progress" style={{ width: `${progressValue}%` }} className="absolute left-0 top-0 bg-[#18BA51] rounded-full h-full transition-all duration-200"></span>
    </div>
  );
};

export default ProgressBar;
