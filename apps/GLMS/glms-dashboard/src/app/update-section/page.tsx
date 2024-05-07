const UpdateSection = () => {
  return (
    <div data-testid="add-section-form" className="flex flex-col gap-[4px] bg-[#fff] border-1 rounded-[4px] justify-center items-center p-6">
      <div className="'flex flex-col  gap-4 border-2 border-dashed rounded-4 p-8 border-[#D6D8DB] rounded-[8px]">
        <div className="flex flex-col py-2">
          <p className="font-bold">Хэсгийн гарчиг</p>
          <input
            data-testid="title"
            className="w-[588px] h-fit border rounded-[4px] p-2"
            type="text"
            name="title"
            placeholder="Оруулна уу..."
            id="title-test"
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <p className="font-bold">Дэлгэрэнгүй</p>
          <input
            data-testid="description"
            className="w-[588px] h-fit border rounded-[4px] p-2"
            id="description-test"
            name="description"
            type="text"
            placeholder="Энд бичнэ үү..."
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <p className="font-bold"> Хэсгийн зураг</p>
        </div>
      </div>
      <div className="flex gap-4 jutify-center items-center py-4">
        <button
          data-cy="add-section-handle-btn"
          className="w-[36px] bg-black h-[36px] text-white rounded-[8px] flex items-center justify-center text-[26px] pb-2 hover:bg-[#D6D8DB] hover:text-black "
        
        >
          +
        </button>
      </div>
    </div>
  );
};
export default UpdateSection;
