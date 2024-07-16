import { Input } from '@/components/ui/input';

const LoginRoleSearch = () => {
  return (
    <div className=" flex justify-between">
      <h1 className="text-[18px] text font-semibold">Users</h1>
      <div className="">
        <Input placeholder="Search"></Input>
      </div>
    </div>
  );
};
export default LoginRoleSearch;
