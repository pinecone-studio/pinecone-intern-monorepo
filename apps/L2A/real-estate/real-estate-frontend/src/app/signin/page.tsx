import SignInForm from './_feature/SignInForm';

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-orange-600">🏠</div>
          <h2 className="text-2xl font-bold">Home Vault</h2>
          <p className="mt-2 text-gray-600">Enter your email below to sign in</p>
        </div>
        <SignInForm />
        <div className="text-center text-sm text-gray-500">
          OR
          <div className="mt-2">
            <a href="/signup" className="underline text-blue-600">
              Create an account
            </a>
          </div>
          <p className="mt-6 text-xs">
            By clicking continue, you agree to our{' '}
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
        <p className="text-xs text-center text-gray-400 mt-6">©2024 Home Vault</p>
      </div>
    </div>
  );
};
export default SignInPage;
