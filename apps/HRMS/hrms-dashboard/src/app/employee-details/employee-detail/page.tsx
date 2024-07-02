import { EmployeesOtherInformation } from '../_components/employee-other-information/EmployeesOtherInformation';
import { EmployeePersonalInfo } from './_components/EmployeePersonalInfo';
import EmployeeInfoSection from './_components/EmplyeeInfoSection';

const Index = () => {
  return (
    <div className="flex justify-center items-center  bg-[#1C202414] w-full h-[100vh] ">
      <div className="flex gap-[26px]">
        <div className="bg-white rounded-[8px] ">
          <EmployeePersonalInfo />
        </div>

        <div className="flex flex-col gap-[24px]">
          <div className="px-[24px] py-[24px] rounded-[8px] bg-white w-[772px]">
            <EmployeeInfoSection />
          </div>
          <div className="px-[24px] py-[24px]  bg-white rounded-[8px] w-[772px]  ">
            <EmployeesOtherInformation />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
