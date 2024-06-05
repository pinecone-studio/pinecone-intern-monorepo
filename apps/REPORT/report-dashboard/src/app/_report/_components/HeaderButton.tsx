import { Arrow } from '../icons';

export const HeaderButton = () => {
  return (
    <div className="flex items-center gap-[48px]">
      <div className=" ">
        <h3 className="text-black text-4xl leading-44px tracking-[0.05625em] font-bold">Репорт</h3>
      </div>
      <div className="max-w-[872px] w-[100%] tracking-[0.05625em]">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="flex justify-between border-solid border-[#D6D8DB] border-[1px] text-black bg-white  py-[11px] px-[8px] rounded-[8px]">
            <div className=" w-[160px]">
              <p className="text-base font-normal tracking-[0.02em] "> 7 хоног сонгох</p>
            </div>
            <Arrow />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box max-w-[220px] w-[100%]">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
      <button className="btn btn-active text-white bg-black rounded-[8px] max-w-[141px] w-[100%]">
        <p className=" text-sm tracking-[0.01em] font-semibold "> Репорт үүсгэх</p>
      </button>
    </div>
  );
};
