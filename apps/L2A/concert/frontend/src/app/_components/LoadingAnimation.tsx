import LinearColor from '../_utils/LoadingMui';

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2" data-testid="loading-text">
      <div className=" flex flex-col items-center justify-center">
        <video src="/loading.mp4" autoPlay loop muted className="w-16 h-16 mb-4 rounded-full shadow-lg bg-[#09090B]" />
        <div className=" text-blue-300 animate-pulse">Түр хүлээнэ үү...</div>
      </div>
      <LinearColor />
    </div>
  );
};

export default LoadingAnimation;
