export const AdvanceSalary =()=>{
    return (
        <div className=" w-[700px] border border-solid border-[#ecedf0] bg-white rounded-lg flex flex-col items-start px-4 pt-2 pb-4 gap-1" >
           <p data-cy="advanceSalary" className="text-[#161616] text-base font-bold">Урьдчилгаа цалин</p>
           <div className="w-[668px] border border-solid border-[#E0E0E0] rounded-lg flex flex-col">
            <div className="  flex justify-between items-center p-4">
               <div className="flex gap-1">
                  <p data-cy="calculateSalary" className="text-sm font-medium">Бодогдох цалин</p>
                  <p data-cy="workAllTime" className="text-sm font-medium text-[#A8A8A8]">16 хоног (40цаг)</p>
               </div>
               <p data-cy="Salary" className="text-sm font-bold">2,250,000₮</p>
            </div>
            <div className="  flex justify-between items-center p-4 border-t border-[#E0E0E0] bg-[#F4F4F4] ">
               <div className="flex gap-1">
                  <p data-cy="socialSecurity" className="text-sm font-medium">НДШ</p>
                  <p data-cy="socialSecurityPercent" className="text-sm font-medium text-[#A8A8A8]">(11.5%)</p>
               </div>
               <p data-cy="socialSecurityMoney" className="text-sm font-medium">-258’750₮</p>
            </div>
            <div className="  flex justify-between items-center p-4 border-t border-[#E0E0E0] bg-[#F4F4F4] ">
               <div className="flex gap-1">
                  <p data-cy="taxes" className="text-sm font-medium">ХХОАТ</p>
                  <p data-cy="percentOfTaxes" className="text-sm font-medium text-[#A8A8A8]">(10%)</p>
               </div>
               <p data-cy="taxesMoney" className="text-sm  font-medium">-199’125₮</p>
            </div>
            <div className="  flex justify-between items-center p-4 border-t border-[#E0E0E0]  ">
              
             <p data-cy="actualMount" className="text-base font-bold">Гарт олгох дүн</p>
            <p data-cy="actualMountMoney" className="text-xl font-bold">1’806’125₮</p>
            </div>
           </div>
        </div>
    )
};