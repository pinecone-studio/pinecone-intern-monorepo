import { Container } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Page = () => {
  return (
    <Container>
      <div className=" text-amber-50 flex items-center justify-center h-[48rem]" data-cy="Sign-In-Page">
        <div className="rounded-2xl border-slate-500 border-[1px] flex-col py-8 px-12 gap-6">
          <div className="flex py-2 flex-col justify-center items-center">
            <p className="text-[#FAFAFA] text-2xl font-semibold tracking-[-0.6px]">Нэвтрэх</p>
          </div>
          <div className="flex flex-col items-center gap-6 self-stretch w-[350px]">
            <div className="flex flex-col items-start gap-1 self-stretch">
              <label htmlFor="email" className="block text-base font-medium text-gray-200">
                Имэйл хаяг:
              </label>
              <Input
                data-cy="Sign-In-Email-Input"
                id="email"
                type="email"
                placeholder="name@example.com"
                aria-label="Имэйл хаяг"
                className="mt-1 block w-full rounded-md border border-gray-700 bg-[#09090B] p-2 text-white text-sm"
              />
            </div>
            <div className="flex flex-col items-start gap-1 self-stretch">
              <label htmlFor="password" className="block text-base font-medium text-gray-200">
                Нууц үг:
              </label>
              <Input
                data-cy="Sign-In-Password-Input"
                id="password"
                type="password"
                aria-label="Нууц үг"
                className="mt-1 block w-full rounded-md border border-gray-700 bg-[#09090B] p-2 text-white text-sm"
              />
              <div className="flex justify-end w-full ">
                <a data-cy="Sign-In-ForgetPassword-link" href="/forget" className="text-[#A1A1AA] self-stretch text-center text-sm leading-5 tracking-wide hover:underline hover:text-[#54d0f9]">
                  Нууц үг мартсан?
                </a>
              </div>
            </div>
            <Button
              data-cy="Sign-In-Submit-Button"
              className="flex h-9 py-2 px-4 items-center w-full gap-2 self-stretch rounded-[6px] bg-[#00B7F4] shadow-sm text-[#18181B] hover:text-[#000000] hover:bg-[#54d0f9]"
            >
              <label>Нэвтрэх</label>
            </Button>
            <p className="text-[#A1A1AA] self-stretch text-center text-sm leading-5 tracking-wide">
              Та бүртгэлтэй хаяггүй бол{' '}
              <a href="/signup" className="hover:underline underline decoration-solid decoration-auto underline-offset-auto  hover:text-[#54d0f9]  duration-300">
                бүртгүүлэх
              </a>{' '}
              хэсгээр орно уу.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Page;
