import Link from 'next/link';

const ResetPassword = () => {
  return (
    <div className="flex flex-col items-center w-full h-screen mx-auto px-4 gap-8 max-w-[340px] min-w-[320px]">
      <p className="text-[#441500] font-semibold text-2xl font-gip">Нууц үг сэргээх</p>
      <div className="flex flex-col gap-2 w-full">
        <input data-testid="email" placeholder="Имэйл хаяг" className="w-full h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]" type="email" />
        <Link href="/reset-password/otp">
          <button data-testid="continue" className="flex w-full h-[36px] font-medium text-sm justify-center items-center rounded-md text-white bg-[#441500]">
            Үргэлжлүүлэх
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
