const SignupFooter = ({ step }: { step: number }) => {
    return (
      <div className="text-center text-sm text-gray-500" data-cy="signup-or-section">
        {step === 1 && (
          <>
            OR
            <div className="mt-2">
              <a href="/signin" className="underline text-[#18181B]" data-cy="signin-link">
                <button className="w-full border-[1px] rounded-full py-2 rounded-lg hover:bg-gray-200" data-cy="log-in-button">Log in </button>
              </a>
            </div>
            <p className="mt-6 text-xs">
              By clicking continue, you agree to our{" "}
              <a href="#" className="underline" data-cy="tos-link">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline" data-cy="privacy-link">
                Privacy Policy
              </a>
            </p>
          </>
        )}
           <p className="text-xs text-center text-gray-400 mt-6 absolute bottom-4 right-0 left-0" data-cy="copyright">
          ©2024 Home Vault
        </p>
      </div>
    );
  };
export default SignupFooter;
  