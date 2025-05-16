type Props = {
  h3: string;
  p: string;
};

export const MiddleHeader = ({ h3, p }: Props) => {
  return (
    <div data-testid="middle" className="w-[672px] border-b-[1px] pb-6 mb-6">
      <h3 className="text-[18px] font-[500 leading-[28px]">{h3}</h3>
      <p className="text-[14px] font-[300] text-[#71717a] leading-[20px]">{p}</p>
    </div>
  );
};
