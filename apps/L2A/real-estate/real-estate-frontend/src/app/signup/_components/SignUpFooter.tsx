const SignupFooter = ({ step }: { step: number }) => {
    return (
      <div className="text-center text-sm text-gray-500" data-cy="signup-or-section">
        {step === 1 && (
          <>
            OR
            <div className="mt-2">
              <a href="/signup" className="underline text-blue-600" data-cy="signup-link">
                Create an account
              </a>
            </div>
            <p className="mt-6 text-xs">
              By clicking continue, you agree to our
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
           <p className="text-xs text-center text-gray-400 mt-6" data-cy="copyright">
          ©2024 Home Vault
        </p>
      </div>
    );
  };
export default SignupFooter;
  