type TTitleContainer = {
  boldTitle: string;
  greyText: string;
};

const TitleContainer = ({ boldTitle, greyText }: TTitleContainer) => {
  return (
    <div className="flex flex-col items-center justify-center pt-2 pb-2 w-[350px] gap-1">
      <div className="inter font-semibold text-2xl leading-8 text-foreground">{boldTitle}</div>
      <div className="inter text-sm font-normal leading-5 text-muted-foreground">{greyText}</div>
    </div>
  );
};
export default TitleContainer;
