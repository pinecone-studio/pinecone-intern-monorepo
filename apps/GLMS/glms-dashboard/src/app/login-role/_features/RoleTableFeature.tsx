import LoginRoleSearch from '../components/LoginRoleSearch';
import RoleTable from '../components/RoleTable';
const RoleTableFeature = () => {
  return (
    <div className="flex flex-col w-full h-full container mx-auto items-center py-8 gap-7">
      <div className="header w-[1154px] bg-[white] rounded-xl h-[72px] flex items-center justify-start p-[20px]">
        <h1 className="text-[24px] font-bold text-blacks">Admin role uptade</h1>
      </div>
      <div className="w-[1154px] h-[216px] bg-white rounded-xl px-[20px] py-[20px]">
        <LoginRoleSearch />
        <RoleTable />
      </div>
    </div>
  );
};

export default RoleTableFeature;
