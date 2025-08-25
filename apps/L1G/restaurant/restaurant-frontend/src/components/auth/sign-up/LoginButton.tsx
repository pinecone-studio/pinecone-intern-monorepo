import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const LoginButton = () => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push('/sign-in');
  };
  return (
    <Button
      onClick={handleOnClick}
      data-cy="createUser-login-btn"
      data-testid="login-btn"
      variant="outline"
      className="flex w-full h-[36px] rounded-md bg-[#FFFFFF] border solid border-[#E4E4E7] px-2 py-4 text-[#441500]"
    >
      Нэвтрэх
    </Button>
  );
};
