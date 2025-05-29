import Image from 'next/image';
import SignInForm from './_components/SignInForm';

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="flex gap-3 items-center justify-center mb-8">
            <Image src="/logo.png" alt="logo" width={34} height={18}/>
          <h2 className="text-2xl font-bold">Home Vault</h2>
          </div>
          <p className="mt-2 text-gray-600">Enter your email below to sign in</p>
        </div>
        <SignInForm />
        <div className="text-center text-sm text-gray-500">
          OR
          <div className="mt-2 p-2 border rounded-md">
            <a href="/signup" className="text-[#18181B]">
              Create an account
            </a>
          </div>
          <p className="mt-6 text-xs">
            By clicking continue, you agree to our{' '}
            <br />
            <a href="#" className="underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <p className="text-xs text-center text-gray-400 mt-6 absolute bottom-4 right-0 left-0">©2024 Home Vault</p>
      </div>
    </div>
  );
};
export default SignInPage;
