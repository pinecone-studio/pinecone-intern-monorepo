import { ArrowBackSVG } from '../../../../assets';

export const ArrowBack = () => {
  return (
    <button data-testid="arrow-back-button-id" className="transition-transform transform active:rotate-45 hover:scale-110 duration-300 ease-in-out w-fit">
      <ArrowBackSVG />
    </button>
  );
};
