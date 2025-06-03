import LinearColor from '../_utils/LoadingMui';

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2" data-testid="loading-text">
      <video src="/loading.mp4" autoPlay loop muted className="w-16 h-16 mb-4 rounded-full shadow-lg bg-[#09090B]" />
      <div>Түр хүлээнэ үү!</div>
      <div className="w-2/12">
        <LinearColor />
      </div>
    </div>
  );
};

export default LoadingAnimation;
