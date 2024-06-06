export const PaginationBar = () => {
  return (
    <div className="w-[792px] justify-between items-center h-[68px] flex">
      <button className="border-[1px] border-[#D6D8DB] w-[102px] h-9 rounded-lg flex gap-2 items-center justify-center text-sm font-semibold focus:opacity-30">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-[6px]">
          <path d="M13.6667 6.16683H3.52499L8.18333 1.5085L6.99999 0.333496L0.333328 7.00016L6.99999 13.6668L8.17499 12.4918L3.52499 7.8335H13.6667V6.16683Z" fill="#121316" />
        </svg>
        <p className="">Өмнөх</p>
      </button>
      <div className="join [&>*]:bg-white [&>*]:border-none [&>*]:shadow-none [&>*]:w-[40px] [&>*]:h-[40px]">
        <button className="join-item btn focus:bg-[#1C202414]">1</button>
        <button className="join-item btn focus:bg-[#1C202414]">2</button>
        <button className="join-item btn focus:bg-[#1C202414]">3</button>
        <button className="join-item btn focus:bg-[#1C202414]">...</button>
        <button className="join-item btn focus:bg-[#1C202414]">8</button>
        <button className="join-item btn focus:bg-[#1C202414]">9</button>
        <button className="join-item btn focus:bg-[#1C202414]">10</button>
      </div>
      <button className="border-[1px] border-[#D6D8DB] w-[102px] h-9 rounded-lg flex gap-2 items-center justify-center text-sm font-semibold focus:opacity-30">
        Дараах
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M9.99998 3.3335L8.82498 4.5085L13.475 9.16683H3.33331V10.8335H13.475L8.82498 15.4918L9.99998 16.6668L16.6666 10.0002L9.99998 3.3335Z" fill="#121316" />
        </svg>
      </button>
    </div>
  );
};
