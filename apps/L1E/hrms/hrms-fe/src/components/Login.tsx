'use client';
import Image from 'next/image';

interface LoginProps {
  emailSubmit: (_e: string) => void;
  emailHnalder: (_e: string) => void;
  error: string | null;
  loader: boolean;
}
export const Login = ({ emailSubmit, emailHnalder, error, loader }: LoginProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-9 w-[364px] h-[364px] rounded-xl border">
      <h2>Нэвтрэх</h2>
      <Image src="/Logo.png" alt="Logo" width={32} height={28} />
      <div>
        <div className="text-sm font-normal ">Имэйл хаяг</div>
        <input
          aria-label="Email"
          data-testid="input"
          data-cy="email-input"
          onChange={(e) => {
            emailHnalder(e.target.value);
          }}
          className="h-10 w-[316px] rounded-md border bg-background px-3 py-2 mt-[6px] text-sm placeholder: focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          id="credential"
        />
        {error && (
          <div data-cy="error-message" className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}{' '}
        {/* Display error */}
      </div>
      <button
        disabled={loader}
        data-cy="login-submit"
        data-testid="button"
        onClick={() => emailSubmit('otp')}
        className="h-10 w-[316px] text-sm font-medium rounded-md bg-primary text-[#FAFAFA] hover:bg-primary/90"
        type="submit"
      >
        {loader ? 'Уншиж байна...' : 'Нэвтрэх'}
      </button>
    </div>
  );
};
