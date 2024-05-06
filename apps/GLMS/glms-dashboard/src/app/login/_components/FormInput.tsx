type FormInputType = { label: string; type: string };

const FormInput = (props: FormInputType) => {
  const { label, type = 'password' } = props;
  return (
    <div className="w-[100%] ">
      <p className="text-4 font-semibold pb-2">{label}</p>
      <input data-testid="kk" type="password" className="w-[100%] h-56px p-2 bg-[#F7F7F8] rounded-lg text-lg font-normal" />
    </div>
  );
};
export default FormInput;
