import Image from "next/image";
import CreateForm from "./_feature/CreateForm";
import LogInButton from "./_feature/LogInButton";

const CreateAccount=()=> {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 ">
            <div>
            <Image
                 src="/Logo.png"
                 alt="Logo"
                 width={40}
                 height={40}
               />
            </div>
            <h2 className="text-2xl">Home Vault</h2>
          </div>
          <h3 className="mt-4 text-2xl font-bold " >Create an account</h3>
          <p className=" text-[#71717A] text-sm text-muted-foreground ">Enter your email below to create your account</p>
        </div>
        <CreateForm/>
      <div className="text-center text-sm text-[#71717A]">
        <div className="flex gap-2 " >
          <div className=" border-t border-[#E4E4E7] mt-[10px] w-52" ></div>
          OR
          <div className=" border-t border-[#E4E4E7] mt-[10px] w-52" ></div>
        </div>
        
          <div className="mt-5" >
             <LogInButton/>
          </div>
          <p className="mt-6">
            By clicking continue, you agree to our<br/>
            <a href="#" className="underline">Terms of Service</a> and{' '}
            <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
        <p className="text-xs text-center text-gray-400 mt-6">©2024 Home Vault</p>
      </div>
    </div>
  );
}
export default CreateAccount