import { GetSectionByLessonIdQuery, Section } from '@/generated';
import { EmptyIcon } from '../../public/assets/EmptyIcon';

const StudentSection = ({ data }: { data: GetSectionByLessonIdQuery | undefined }) => {
  return (
    <div className="flex flex-col gap-[4px] bg-[#fff] border-1 rounded-xl justify-center items-center p-6 dark:bg-[#2b2b2b] max-w-[1440px] m-auto min-h-[75vh] pt-10 ">
      {data?.getSectionByLessonId
        ?.filter((section: Section) => section.posted == true)
        .map((section: Section, index: number) => {
          return (
            <div className="max-w-[791px] w-full text-black dark:text-[#dedede] h-full mb-20" key={index}>
              <div className="font-bold text-4xl mb-5">{section.title}</div>
              <div className="text-base leading-9 mb-5">{section.description}</div>
              <div>
                <img src={`${section.contentImage}`} className="h-[352px] max-w-[791px] w-full object-cover" />
              </div>
            </div>
          );
        })}
      {!data && <div className="loading loading-spinner m-auto loading-lg" />}
      {data?.getSectionByLessonId?.length === 0 && <EmptyIcon />}
      {data?.getSectionByLessonId?.length !== 0 && (
        <div className="flex gap-5">
          <button
            name="submitBtn"
            className={`
            btn-outline hover:bg-[#f0f0f0] hover:text-black dark:text-[#dedede] dark:hover:bg-[#292929] dark:border-[#515151] dark:bg-[#2b2b2b]
         rounded-lg w-[280px] h-[56px]  flex justify-center items-center btn`}
            data-testid="create-button"
          >
            <a href={`/${localStorage.getItem('courseID') || 'dashboard'}`} className="text-[18px] font-semibold">
              Буцах
            </a>
          </button>
          <button
            name="submitBtn"
            className={`
          bg-black hover:bg-black text-white dark:hover:bg-[#3d3d3def] dark:border-[#515151] dark:bg-[#4a4a4a]
         rounded-lg w-[280px] h-[56px]  flex justify-center items-center btn`}
            data-testid="create-button"
          >
            <p className="text-[18px] font-semibold">Quiz өгөх</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentSection;
