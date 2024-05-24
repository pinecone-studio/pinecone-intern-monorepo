'use client';
import { GetSectionByLessonIdQuery, Section } from '@/generated';
import { DeleteIcon } from '../../../../public/assets/DeleteIcon';
import { EditButtonIcon } from '../../../../public/assets/EditButtonicon';
type GetSectionsType = {
  handleUpdateSectionPage: (_id: string | undefined | null) => void;
  handleDeleteSection: (_id: string | undefined | null) => void;
  isLoading: boolean;
  data: GetSectionByLessonIdQuery | undefined;
  loading: boolean;
};

const GetSections = (props: GetSectionsType) => {
  const { handleUpdateSectionPage, handleDeleteSection, loading, data, isLoading } = props;

  return (
    <div data-testid="get-sections-container" className="bg-[#fff] rounded-[6px]">
      {loading && (
        <div className="w-full flex justify-center mt-8">
          <div className="loading loading-spinner loading-md" />
        </div>
      )}
      {data?.getSectionByLessonId?.map((section: Section) => {
        if (section.id) localStorage.setItem('sectionId', section.id);
        return (
          <div data-testid="get-section-form" key={section.id} className="flex flex-col justify-center items-center">
            <div className="flex flex-col gap-[4px] bg-[#fff] border-1 rounded-[4px] justify-center items-center p-6">
              <div className="text-[#9f9f9f] flex justify-between max-w-[656px] w-full">
                <div>
                  <span className="font-bold">Төлөв: </span>
                  <span className={`${section.posted == true ? 'text-green-400' : 'text-yellow-400'}`}> {section.posted == true ? 'Нийтлэгдсэн' : 'Нийтлэгдээгүй'}</span>
                </div>
                <div>
                  <span className="font-bold">Үүссэн огноо: </span> {section.createdAt.slice(0, 10)}
                </div>
              </div>
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
                    <img className="w-[588px] h-60 rounded-[4px] " src={`${section.contentImage}`} alt="sectionImage" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-center py-4">
              <button
                data-cy="update-btn"
                onClick={() => handleUpdateSectionPage(section.id)}
                className=" w-[101px] bg-transparent border-2  font-bold rounded-[12px] p-2 text-black flex items-center justify-center gap-2 hover:bg-[#D6D8DB]"
              >
                Засах <EditButtonIcon />
              </button>
              <button
                cy-data="delete-button-cy-test"
                onClick={() => handleDeleteSection(section.id)}
                disabled={isLoading}
                className="w-[101px] bg-transparent border-2 font-bold rounded-[12px] p-2 text-black flex items-center judtify-center gap-2 hover:bg-[#D6D8DB]"
              >
                {isLoading ? (
                  <div className="loading loading-spinner loading-sm m-auto" />
                ) : (
                  <p className="flex">
                    Устгах <DeleteIcon />
                  </p>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default GetSections;
