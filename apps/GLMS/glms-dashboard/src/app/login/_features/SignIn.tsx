import Button from '../_components/Button';
import FormInput from '../_components/FormInput';

const SignIn = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex justify-center items-center">
        <div className="w-[440px] border flex flex-col items-center p-10 gap-6 rounded-2xl">
          <h1 className="text-[36px] font-bold">Нэвтрэх</h1>
          <div className="w-[100%]">
            <FormInput label="Таны имэйл эсвэл утасны дугаар" type="text" />
            <FormInput label="Нууц үг" type="password" />
            <Button />
          </div>
        </div>
      </div>
      <img className="h-[100%] w-1/2" src="Image.png" alt="" />
    </div>
  );
};
export default SignIn;
