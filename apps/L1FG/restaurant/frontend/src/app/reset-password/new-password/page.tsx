import Link from 'next/link';

const newPasswordPage = () => {
  return (
    <div className="flex flex-col items-center w-full h-screen mx-auto px-4 gap-8 max-w-[340px] min-w-[320px]">
      <p>Шинэ нууц үг</p>
      <div className="flex flex-col gap-2 w-full">
        <input data-testid="newPassword" placeholder="Нууц үг" className="w-full h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]" type="password" />
        <input data-testid="RepeatNewPassword" placeholder="Нууц үг давтах" className="w-full h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]" type="password" />
        <Link href="/reset-password/done">
          <button data-testid="CreateNewPassword" className="flex w-full h-[36px] font-medium text-sm justify-center items-center rounded-md text-white bg-[#441500]">
            Үүсгэх
          </button>
        </Link>
      </div>
    </div>
  );
};

export default newPasswordPage;
