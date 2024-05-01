import ArrowBackIcon from "../../assets/ArrowBackIcon";


const BackButton = () => {
  return (
    <div data-testid="prev-button-test-id">
      <button className="flex justify-center items-center rounded-[8px] gap-[2px] w-[99px] ease-in">
<ArrowBackIcon/>
        <p >
          Сэдвүүд
        </p>
      </button>
    </div>
  );
};

export default BackButton;