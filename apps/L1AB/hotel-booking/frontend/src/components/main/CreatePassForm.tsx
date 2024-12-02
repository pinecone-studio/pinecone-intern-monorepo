import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { usePasswordChangeMutation } from '@/generated';
import { ForgetPassFormProps } from '@/app/forgetpassword/page';

export const CreatePassForm = ({ inputData, handleOnchange }: ForgetPassFormProps) => {
  const [passwordChange, { loading, error }] = usePasswordChangeMutation();
  const router = useRouter();

  const handleClick = async () => {
    await passwordChange({
      variables: {
        input: { otp: inputData.otp, email: inputData.email, password: inputData.password },
      },
    });
    router.push('/signin');
  };

  const isPasswordValid = inputData.password === inputData.rePassword && inputData.password.length >= 10;

  return (
    <div className="flex justify-center">
      <div className="mt-[200px] flex flex-col items-center gap-6 w-[350px]">
        <div className="flex gap-2 items-center justify-center max-h-5">
          <p className="h-5 w-5 bg-[#2563EB] rounded-full"></p>
          <p className="text-[20px]">Pedia</p>
        </div>
        <div className="flex items-center flex-col">
          <p className="text-[24px] font-semibold leading-8">Set new password</p>
          <p className="text-[#71717A] text-sm text-center">
            Use a minimum of 10 characters, including
            <br />
            uppercase letters, lowercase letters, and numbers
          </p>
        </div>
        {error && (
          <div className="text-red-500 text-sm text-center">
            <p>{error.message}</p>
          </div>
        )}
        <div className="w-full space-y-2">
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" onChange={handleOnchange} name="password" placeholder="********" value={inputData.password} disabled={loading} />
          </div>
          <div className="space-y-2 pt-2">
            <Label>Confirm Password</Label>
            <Input type="password" onChange={handleOnchange} name="rePassword" placeholder="********" value={inputData.rePassword} disabled={loading} />
          </div>
          <Button className="w-full bg-[#2563EB]" onClick={handleClick} disabled={!isPasswordValid || loading}>
            {loading ? 'Setting password...' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};
