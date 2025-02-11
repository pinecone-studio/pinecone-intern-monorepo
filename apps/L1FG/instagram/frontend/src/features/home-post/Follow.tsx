export const Follow = ({ handleClickLike }: { handleClickLike: () => Promise<void> }) => {
  return (
    <button
      className="w-full h-[30px] bg-[#2563EB] text-white rounded-[6px]
            flex justify-center items-center mt-2"
      data-testid="friendship-status-follow"
      onClick={async () => {
        await handleClickLike();
      }}
    >
      Follow
    </button>
  );
};
