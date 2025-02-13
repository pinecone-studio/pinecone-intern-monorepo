export const IsRequest = ({ onclick }: { onclick: () => void }) => {
  return (
    <div className="flex gap-2">
      <button onClick={onclick} className="bg-[#2563EB] h-[36px] w-[86px] text-white rounded-md">
        Confirm
      </button>
      <button className="bg-[#F4F4F5] h-[36px] w-[86px] rounded-md">Delete</button>
    </div>
  );
};
