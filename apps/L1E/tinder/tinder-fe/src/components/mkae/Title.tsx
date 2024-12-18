type TitleProps = {
  text: string;
  desc: string;
};

export const Title = ({ text, desc }: TitleProps) => {
  return (
    <>
      <div className="w-[350px] h-[72px] flex justify-center items-center flex-col gap-[4px] ">
        <h1 className="font-semibold text-2xl ">{text}</h1>
        <p className="text-[#71717A] text-[14px] text-center ">{desc}</p>
      </div>
    </>
  );
};
