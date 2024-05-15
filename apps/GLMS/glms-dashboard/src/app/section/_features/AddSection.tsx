'use client';
import { ChangeEventHandler, Dispatch, FormEvent, SetStateAction } from 'react';
import FileUploader from '../../../components/FileUploader';
type AddSectionTypes = {
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  setFieldValue: (_field: string, _value: string, _shouldValidate?: boolean) => void;
  setIsPosted: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  title: string;
  description: string;
  thumbnail: string;
};
const AddSection = (props: AddSectionTypes) => {
  const { handleChange, title, description, thumbnail, setFieldValue, setIsPosted, handleSubmit } = props;
  const status = ['Нийтлэх', 'Хадгалах'];

  return (
    <div data-testid="add-section-form" className="flex flex-col gap-[4px] bg-[#fff] border-1 rounded-[4px] justify-center items-center p-6">
      <div className="'flex flex-col  gap-4 border-2 border-dashed rounded-4 p-8 border-[#D6D8DB] rounded-[8px]">
        <div className="flex flex-col py-2">
          <p className="font-bold">Хэсгийн гарчиг</p>
          <input
            data-cy="title"
            className="w-[588px] h-fit border rounded-[4px] p-2"
            type="text"
            name="title"
            placeholder="Оруулна уу..."
            id="title-test"
            onChange={handleChange}
            value={title}
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <p className="font-bold">Дэлгэрэнгүй</p>
          <textarea
            data-cy="description"
            className="w-[588px] h-[160px] border rounded-[4px] p-2"
            id="description-test"
            name="description"
            onChange={handleChange}
            value={description}
            placeholder="Энд бичнэ үү..."
          ></textarea>
        </div>
        <div className="flex flex-col py-2">
          <p className="font-bold"> Хэсгийн зураг</p>
          <FileUploader thumbnail={thumbnail} setFieldValue={setFieldValue} />
        </div>
      </div>
      <div className="flex w-full max-w-[1140px] justify-between items-center mt-5">
        {status.map((item, index) => {
          const handleAddSection = () => {
            item === 'Нийтлэх' ? setIsPosted(true) : setIsPosted(false);
            handleSubmit();
          };
          return (
            <button
              key={index}
              name="submitBtn"
              data-cy="add-section-handle-btn"
              onClick={handleAddSection}
              className={`${
                item == 'Хадгалах' ? 'bg-[#121316] hover:bg-[#252525] text-white' : 'btn-outline hover:bg-[#f0f0f0] hover:text-black'
              } btn rounded-lg w-[280px] h-[56px]  flex justify-center items-center `}
              data-testid="create-button"
              disabled={!title || !description || !thumbnail}
            >
              <p className="text-[18px] font-semibold">{item}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AddSection;
