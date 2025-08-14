type TTitleContainer = {
  boldTitle: string;
  greyText: string;
};

const TitleContainer = ({ boldTitle, greyText }: TTitleContainer) => {
  return (
    <div data-testid="title-container" className="flex flex-col items-center justify-center w-full max-w-[350px] pt-2 pb-2 gap-1 text-center">
      <h1 className="font-sans font-semibold text-2xl leading-8 text-foreground">{boldTitle}</h1>
      <div className="font-sans text-sm font-normal leading-5 text-muted-foreground">{greyText}</div>
    </div>
  );
};
export default TitleContainer;
