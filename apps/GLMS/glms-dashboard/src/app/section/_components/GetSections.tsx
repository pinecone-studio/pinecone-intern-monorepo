'use client';
import { useGetSectionsQuery  } from '../../../generated';
import SectionForm from './SectionForm';
import EditIcon from '../assets/EditIcon';
import DeleteIcon from '../assets/DeleteIcon';

const GetSections = () => {
  const { data} = useGetSectionsQuery();

  return (
    <div data-testid="get-sections-query" className="bg-[#fff] rounded-[6px]">
      {data?.getSections.map((section) => (
        <div className='flex flex-col justify-center items-center'>
          <SectionForm title={section.title || ''} description={section.description || ''} contentImage={section.contentImage || ''} />
          <div className="flex gap-4 items-center py-4">
            <button className=" w-[101px] bg-transparent border-2 border font-bold rounded-[12px] p-2 text-black flex items-center justify-center gap-2 hover:bg-[#D6D8DB]">
              Засах <EditIcon/>
            </button>
            <button  className="w-[101px] bg-transparent border-2 border font-bold rounded-[12px] p-2 text-black flex items-center judtify-center gap-2 hover:bg-[#D6D8DB]">
              Устгах <DeleteIcon/>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default GetSections;
