'use client';
import { ChangeEventHandler, Dispatch, FormEvent, SetStateAction } from 'react';
import FileUploader from '../../../components/FileUploader';
import { toast } from 'react-toastify';
type AddSectionTypes = {
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  setFieldValue: (_field: string, _value: string, _shouldValidate?: boolean) => void;
  setIsPosted: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (_e?: FormEvent<HTMLFormElement> | undefined) => void;
  title: string;
  description: string;
  thumbnail: string;
};
const AddSection = (props: AddSectionTypes) => {
  const { handleChange, title, description, thumbnail, setFieldValue, setIsPosted, handleSubmit } = props;
  const status = ['Нийтлэх', 'Хадгалах'];

  return (
    <div data-testid="add-section-form">
      <div className="'flex flex-col gap-4 dark:border-[#3d3d3def] border-dashed border-2 border-[#D6D8DB] rounded-4 p-8 rounded-[8px] dark:text-[#dedede]">
        <div className="flex flex-col py-2">
          <p className="font-bold mb-2">Хэсгийн гарчиг</p>
          <input
            data-cy="title"
            className="w-[588px] h-fit border rounded-[4px] p-2 dark:bg-[#3d3d3def] dark:text-[#dedede] dark:border-none dark:outline-none"
            type="text"
            name="title"
            placeholder="Оруулна уу..."
            id="title-test"
            onChange={handleChange}
            value={title}
          />
        </div>
        <div className="flex flex-col py-2">
          <p className="font-bold mb-2">Дэлгэрэнгүй</p>
          <textarea
            data-cy="description"
            className="w-[588px] h-[160px] border rounded-[4px] p-2 dark:bg-[#3d3d3def] dark:text-[#dedede] dark:border-none dark:outline-none"
            id="description-test"
            name="description"
            onChange={handleChange}
            value={description}
            placeholder="Энд бичнэ үү..."
          />
        </div>
        <div className="flex flex-col py-2">
          <p className="font-bold mb-2"> Хэсгийн зураг</p>
          <FileUploader thumbnail={thumbnail} setFieldValue={setFieldValue} />
        </div>
      </div>
      <div className="flex w-full max-w-[1140px] justify-between items-center mt-5">
        {status.map((item, index) => {
          const handleAddSection = () => {
            item === 'Нийтлэх' ? setIsPosted(true) : setIsPosted(false);
            handleSubmit();
            toast.success('Таны хичээл амжилттай хадгалагдлаа ', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: true,
            });
          };
          return (
            <button
              key={index}
              name="submitBtn"
              data-cy="add-section-handle-btn"
              onClick={handleAddSection}
              className={`${
                item == 'Хадгалах'
                  ? 'bg-black hover:bg-black text-white dark:hover:bg-[#3d3d3def] dark:border-[#515151] dark:bg-[#4a4a4a]'
                  : 'btn-outline hover:bg-[#f0f0f0] hover:text-black dark:text-[#dedede] dark:hover:bg-[#292929] dark:border-[#515151] dark:bg-[#2b2b2b]'
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
