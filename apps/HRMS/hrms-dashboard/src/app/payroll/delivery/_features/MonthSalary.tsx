export const MonthSalary = () => {
  return (
    <>
      <main className="flex w-[1170px] flex-col p-8 ">
        <div className="flex flex-col px-6 py-4 bg-white w-full gap-6 rounded-xl text-[#121316]">
          <h1 data-cy="monthNumber" className="w-full  text-lg font-semibold">
            5 САР
          </h1>
          <div className="flex flex-col *:py-4">
            <div className=" flex flex-row ">
              <div className="w-full">
                <h2 data-cy="advanceSalary" className="text-base font-semibold">Урьдчилгаа цалин</h2>
                <p  data-cy="advanceSalaryDate" className="date text-sm font-normal text-">5/1 -с 5/15</p>
              </div>
              <div className="icon rounded-full border  w-5 h-5"></div>
              {/* icon Button component */}
            </div>
          </div>
          <div>hello from MonthSalary</div>
        </div>
      </main>
    </>
  );
};
