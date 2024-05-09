'use client';
import { useDeleteSectionMutation, useGetSectionsQuery } from '../../../generated';
import { DeleteIcon } from '../../../../public/assets/DeleteIcon';
import { EditButtonIcon } from '../../../../public/assets/EditButtonicon';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const GetSections = () => {
  const { data, refetch } = useGetSectionsQuery();
  const [deleteSection] = useDeleteSectionMutation();
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleDeleteSection = (id: string | undefined | null) => {
      if (id) {
        deleteSection({ variables: { id } });
        setSuccessMessage('Section deleted successfully.');
        refetch();
      }
  };

  const handleUpdateSectionPage = (sectionId : string | undefined | null) => {
    if(sectionId){
      localStorage.setItem("sectionId" , sectionId)
      router.push("/update-section")
    }
  }

  useEffect(() => {
    if (data) {
      setSuccessMessage('');
    }
  }, [data]);

  return (
    <div data-testid="get-sections-container" className="bg-[#fff] rounded-[6px]">
      {data?.getSections.map((section) => (
        <div data-testid="get-section-form" key={section.id} className="flex flex-col justify-center items-center">
          <div className="flex flex-col gap-[4px] bg-[#fff] border-1 rounded-[4px] justify-center items-center p-6">
            <div className="'flex flex-col gap-4 border-2 border-dashed rounded-4 p-8 border-[#D6D8DB] rounded-[8px]">
              <div data-cy="title" className="flex flex-col py-2">
                <p className="font-bold">Хэсгийн гарчиг</p>
                <p className="w-[588px] h-fit border rounded-[4px] p-2">{section.title}</p>
              </div>
              <div data-cy="description" className="flex flex-col py-2">
                <p className="font-bold">Дэлгэрэнгүй</p>
                <p className="w-[588px] h-fit border rounded-[4px] p-2">{section.description}</p>
              </div>
              <div data-cy="contentImage" className="flex flex-col py-2">
                <p className="font-bold"> Хэсгийн зураг</p>
                <div data-testid="contentImage" className="w-[588px] h-60">
                  <img className="w-[588px] h-60 rounded-[4px]" src={`${section.contentImage}`} alt="sectionImage" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-center py-4">
            <button 
            data-cy="update-btn"
            onClick={()=>handleUpdateSectionPage(section.id)} 
            className=" w-[101px] bg-transparent border-2  font-bold rounded-[12px] p-2 text-black flex items-center justify-center gap-2 hover:bg-[#D6D8DB]">
              Засах <EditButtonIcon />
            </button>
            <button
              data-cy="delete-btn"
              onClick={() => handleDeleteSection(section.id)}
              className="w-[101px] bg-transparent border-2 font-bold rounded-[12px] p-2 text-black flex items-center judtify-center gap-2 hover:bg-[#D6D8DB]"
            >
              Устгах <DeleteIcon />
            </button>
          </div>
        </div>
      ))}
      {successMessage && <div className="flex justify-center bg-green-200 text-green-700 rounded-md p-2">{successMessage}</div>}
    </div>
  );
};
export default GetSections;