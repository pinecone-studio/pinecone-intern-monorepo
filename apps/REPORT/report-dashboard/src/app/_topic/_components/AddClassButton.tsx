'use client';
export const AddClassButton = () => {
  return (
    <div>
      <button
        className="btn w-[108px] min-w-[80px] h-[48px] border-[#D6D8DB] text-[#121316] bg-white border gap-[4px] "
        onClick={() => {
          if (document) {
            (document.getElementById('my_modal_3') as HTMLFormElement).showModal();
          }
        }}
      >
        <p className=" text-base font-semibold leading-5 tracking-[-0.16px]">Анги</p>
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path d="M19 13.5H13V19.5H11V13.5H5V11.5H11V5.5H13V11.5H19V13.5Z" fill="#121316" />
          </svg>
        </p>
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="flex flex-col modal-box w-[620px] p-[40px] gap-[40px]">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold ">Анги нэмэх</p>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost right-2 top-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#121316" />
                </svg>
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-4 text-[#121316]">
            <div>
              <p className="mb-1">Ангийн нэр:</p>
              <input type="text" className="input input-bordered w-full bg-[#F7F7F8]" />
            </div>
            <div className="flex gap-[16px]">
              <div>
                <p className="mb-1 text-[#121316]">Багш 1-н нэр:</p>
                <input type="text" className="input input-bordered w-full min-w-[208px] p-2 bg-[#F7F7F8]" />
              </div>
              <div>
                <p className="mb-1">Багш 2-н нэр:</p>
                <input type="text" className="input input-bordered w-full min-w-[208px] p-2 bg-[#F7F7F8]" />
              </div>
            </div>
            <div className="flex gap-[16px]">
              <div>
                <p className="mb-1">Эхлэх огноо</p>
                <input type="date" className="input input-bordered w-full min-w-[208px] p-2 bg-[#F7F7F8]" />
              </div>
              <div>
                <p className="mb-1">Дуусах огноо</p>
                <input type="date" className="input input-bordered w-full min-w-[208px] p-2 bg-[#F7F7F8]" />
              </div>
            </div>
            <div>
              <p className="mb-1"> Анги сонгох</p>
              <select className="select select-bordered w-full bg-[#F7F7F8]">
                <option>Coding</option>
                <option>Design</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-10">
            <button className="btn w-[141px] min-w-[80px] bg-black text-white text-base font-60 ">
              <p>Хадгалах</p>
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="white" />
                </svg>
              </p>
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
