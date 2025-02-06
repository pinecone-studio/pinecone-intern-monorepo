export const AdminHeader = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center justify-center gap-1">
          <div data-testid="logo-dot" className="w-[20px] h-[20px] border rounded-full bg-[#00B7F4]"></div>
          <p>TICKET BOOKING</p>
        </div>
        <div data-testid="user-icon" className="w-[36px] h-[36px] border rounded-full bg-red-900"></div>
      </div>
      <div></div>
    </div>
  );
};
