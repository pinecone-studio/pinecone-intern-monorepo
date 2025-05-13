import { ImSpinner9 } from 'react-icons/im';
const LoadingText = () => {
  return (
    <div className=" flex items-center gap-3">
      <div>Түр хүлээнэ үү!</div>
      <ImSpinner9 className="animate-spin" />
    </div>
  );
};

export default LoadingText;
