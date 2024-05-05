'use client';
import { useGetSectionsQuery } from '../../../generated';
import EditIcon from '../assets/EditIcon';
import DeleteIcon from '../assets/DeleteIcon';

const GetSections = () => {
  const { data } = useGetSectionsQuery();

  return (
    <div data-testid="get-sections-query" className="bg-[#fff] rounded-[6px]">
      {data?.getSections.map((section) => (
        <div className="flex flex-col justify-center items-center">
          <div key={section.id} data-testid="section-form" className="flex flex-col gap-[4px] bg-[#fff] border-1 rounded-[4px] justify-center items-center p-6">
            <div className="'flex flex-col gap-4 border-2 border-dashed rounded-4 p-8 border-[#D6D8DB] rounded-[8px]">
              <div className="flex flex-col py-2">
                <p className="font-bold">Хэсгийн гарчиг</p>
                <p data-testid="title" className="w-[588px] h-fit border rounded-[4px] p-2">
                  {section.title}
                </p>
              </div>
              <div className="flex flex-col py-2">
                <p className="font-bold">Дэлгэрэнгүй</p>
                <p data-testid="description" className="w-[588px] h-fit border rounded-[4px] p-2">
                  {section.description}
                </p>
              </div>
              <div className="flex flex-col py-2">
                <p className="font-bold"> Хэсгийн зураг</p>
                <div className="w-[588px] h-60 border-2 border-dashed border-gray-300 rounded-xl flex flex-col justify-center items-center">
                  <div data-testid="contentImage" className="flex items-center justify-center">
                    <img src={`${section.contentImage}`} alt="sectionImage"></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-center py-4">
            <button className=" w-[101px] bg-transparent border-2 border font-bold rounded-[12px] p-2 text-black flex items-center justify-center gap-2 hover:bg-[#D6D8DB]">
              Засах <EditIcon />
            </button>
            <button className="w-[101px] bg-transparent border-2 border font-bold rounded-[12px] p-2 text-black flex items-center judtify-center gap-2 hover:bg-[#D6D8DB]">
              Устгах <DeleteIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default GetSections;
