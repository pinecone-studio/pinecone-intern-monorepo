type Props = {
  h3: string;
  p: string;
};

export const SignUpHeader = ({ h3, p }: Props) => {
  return (
    <div data-testid="SignUpHeader" className="flex flex-col items-center font-medium">
      <div className="flex items-center gap-2 mb-[24px]">
        <div className="w-5 h-5 rounded-full bg-[#2563eb]"></div>
        <h2 className="text-[#09090b] text-[20px]">Pedia</h2>
      </div>
      <h3 className="text-[24px] leading-8 mb-[4px] font-medium font-inter">{h3}</h3>
      <p className="font-light text-[#71717a] text-center text-[14px]">{p}</p>
    </div>
  );
};
