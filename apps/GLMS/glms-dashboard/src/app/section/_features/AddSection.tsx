import { ChangeEvent } from 'react';
import FileUploader from '../../../components/FileUploader';

type AddSectionProps = {
  titleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  titleValue: string;
  descriptionOnChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  descriptionValue: string;
  thumbnailOnChange: string;
  ThumbnailValue: (field: string, value: any) => void;
  onClick: () => void;
  buttonName : string;
};

const AddSection = ({titleOnChange , titleValue , descriptionOnChange , descriptionValue , thumbnailOnChange , ThumbnailValue , onClick , buttonName } : AddSectionProps) => {

    return(
        <div  data-testid="add-section-form" className="flex flex-col gap-[4px] bg-[#fff] border-1 rounded-[4px] justify-center items-center p-6">
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
             onChange={titleOnChange}
             value={titleValue}
             ></input>
          </div>
          <div className="flex flex-col py-2">
            <p className="font-bold">Дэлгэрэнгүй</p>
            <textarea 
            data-testid="description"
            className="w-[588px] h-[160px] border rounded-[4px] p-2" 
            id="description-test"
            name="description"
            onChange={descriptionOnChange}
            value={descriptionValue}
            placeholder="Энд бичнэ үү..."
            ></textarea>
          </div>
          <div className="flex flex-col py-2">
            <p className="font-bold"> Хэсгийн зураг</p>
            <FileUploader thumbnail={thumbnailOnChange} setFieldValue={ThumbnailValue} />
          </div>
        </div>
        <div className="flex gap-4 jutify-center items-center py-4">
            <button data-cy="add-section-handle-btn" className="px-6 py-2 bg-black text-white rounded-[8px] flex items-center justify-center text-[20px] pb-2 hover:bg-[#D6D8DB] hover:text-black hover:cursor:pointer"
             onClick={()=>onClick()}
            >
              {buttonName}
            </button>
          </div>
      </div>
    )
}

export default AddSection