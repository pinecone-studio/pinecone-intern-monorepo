import { ForgetPassFormProps } from '@/app/forgetpassword/page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePasswordRecoveryRequestMutation } from '@/generated';

export const ForgetPassForm = ({ setInputData, setCurrentIndex, inputData, handleOnchange }: ForgetPassFormProps) => {
  const [passwordRecoveryRequest, { loading, error }] = usePasswordRecoveryRequestMutation();

  const handleClick = async () => {
    await passwordRecoveryRequest({
      variables: {
        input: { email: inputData.email },
      },
    });
    setInputData({ email: inputData.email, otp: '', password: '', rePassword: '' });
    setCurrentIndex(1);
  };

  return (
    <div className="flex justify-center">
      <div className="mt-[200px] flex flex-col items-center gap-6 w-[350px]">
        <div className="flex gap-2 items-center justify-center max-h-5">
          <p className="h-5 w-5 bg-[#2563EB] rounded-full"></p>
          <p className="text-[20px]">Pedia</p>
        </div>
        <div className="flex items-center flex-col">
          <p className="text-[24px] font-semibold leading-8">Forget password</p>
          <p className="text-[#71717A] text-sm">Enter your email account to reset password</p>
        </div>
        <div className="w-full space-y-2">
          <p className="font-medium">Email</p>
          <Input data-testid="email-input" placeholder="name@example.com" name="email" value={inputData.email} onChange={handleOnchange} />
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
          <Button data-testid="send-otp-button" className="w-full bg-[#2563EB]" onClick={handleClick} disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </Button>
        </div>
      </div>
    </div>
  );
};
