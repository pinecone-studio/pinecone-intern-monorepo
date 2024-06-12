import { Input } from '@/components/ui/input';

const SignInModal = () => {
  return (
    <div className="w-[440px] h-[424px] border border-[1px solid #ECEDF0] rounded-[16px] p-[40px]">
      <div className="flex flex-col items-center gap-[24px]">
        <h1 className="text-[36px] font-bold">Нэвтрэх</h1>
        <div className="flex flex-col items-center gap-[16px]">
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Таны имэйл эсвэл утасны дугаар</p>
            <Input className="w-[360px] h-[56px] text-[18px] font-normal bg-[#F7F7F8]" placeholder="Имэйл эсвэл утасны дугаар" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Нууц үг</p>
            <Input className="w-[360px] h-[56px] text-[18px] font-normal bg-[#F7F7F8]" placeholder="Нууц үгээ оруулна уу" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignInModal;
