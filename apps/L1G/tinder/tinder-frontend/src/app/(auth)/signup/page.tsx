import { CreateAccount } from "@/components/CreateAccount";

const Signup = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center">
      <div className="flex-grow flex justify-center items-center">
        <CreateAccount />
      </div>
      <div className="mb-4">
        <p className="font-[400] text-[14px] text-[#71717A] text-center">
          ©2024 Tinder
        </p>
      </div>
    </div>
  );
};

export default Signup;
