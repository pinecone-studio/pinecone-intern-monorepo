export const PasswordResetPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#09090B]">
      <div className="w-[446px] h-[300px] bg-[#09090B] border-2 border-[#27272A] rounded-md flex flex-col items-center py-6">
        <p className="text-white text-[24px] font-semibold mb-6">Нууц үг сэргээх</p>
        <div className="w-[350px]">
          <p className="text-[#FAFAFA] mb-2">Имэйл хаяг:</p>
          <input className="w-full h-[36px] bg-black text-[13px] text-white pl-[10px] border-2 border-[#27272A] rounded-sm mb-6" type="email" placeholder="name@example.com" />
          <button className="w-full h-[36px] bg-[#00B7F4] text-black rounded-sm">Үргэлжлүүлэх</button>
        </div>
      </div>
    </div>
  );
};
