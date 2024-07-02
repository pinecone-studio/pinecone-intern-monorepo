import Image from 'next/image';
import LoginForm from './_feature/LoginForm';



const Login = () => {
  return (
    <div data-testid="sign-in-page" className="w-full h-[100vh] flex">
      <div className="w-[50%] bg-[#FFF] flex items-center justify-center">
    <LoginForm/>
      </div>
      <div className="w-[50%] flex h-full bg-[#121316] items-center justify-center">
        <div>
        <Image src="/Academy.svg" alt="Pincone Logo" height={128} width={440} />
        </div>
      </div>
    </div>
  );
};

export default Login;