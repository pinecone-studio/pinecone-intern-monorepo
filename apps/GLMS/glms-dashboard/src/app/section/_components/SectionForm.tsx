"use client"
import DeleteIcon from '../assets/DeleteIcon';
import EditIcon from '../assets/EditIcon';
import PhotoOutlinedIcon from '../assets/PhotoOutlinedIcon';

const SectionForm = ({ title, description}: { title: string; description: string; }) => {
  return (
    <div  data-testid="section-form" className="flex flex-col gap-[4px] bg-[#fff] border-1 rounded-[4px] justify-center items-center p-6">
      <div className="'flex flex-col gap-4 border-2 border-dashed rounded-4 p-8 border-[#D6D8DB] rounded-[8px]">
        <div className="flex flex-col py-2">
          <p className="font-bold">Хэсгийн гарчиг</p>
          <div data-testid="title" className="w-[588px] h-[56px] border rounded-[4px] p-2" >{title}</div>
        </div>
        <div className="flex flex-col py-2">
          <p className="font-bold">Дэлгэрэнгүй</p>
          <div data-testid="description" className="w-[588px] h-[56px] border rounded-[4px] p-2" >{description}</div>
        </div>
        <div className="flex flex-col py-2">
          <p className="font-bold"> Хичээлийн зураг</p>
          <div className="w-[588px] h-60 border-2 border-dashed border-gray-300 rounded-xl flex flex-col justify-center items-center">
            <PhotoOutlinedIcon />
            <div className="flex items-center justify-center">
              <p className="font-semibold text-gray-800 text-lg">Зургийг чирж буулгах эсвэл</p>
              <div className="w-20 overflow-hidden relative flex items-center justify-center">
                <p className="underline font-semibold text-gray-800 text-lg">Browse</p>
                <input id="file-test" name="image" type="file" className="opacity-0 absolute" style={{ padding: 0, position: 'absolute' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center py-4">
        <button className=" w-[101px] bg-transparent border-2 border font-bold rounded-[12px] p-2 text-black flex items-center justify-center gap-2">
          Засах <EditIcon />
        </button>
        <button className="w-[101px] bg-transparent border-2 border font-bold rounded-[12px] p-2 text-black flex items-center judtify-center gap-2">
          Устгах <DeleteIcon />
        </button>
        <hr className="color-black" />
        <button data-cy="add-section-handle-btn" className="w-[36px] bg-black h-[36px] text-white rounded-[8px] flex items-center justify-center text-[26px] pb-2 ">
          +
        </button>
      </div>
    </div>
  );
};

export default SectionForm;
