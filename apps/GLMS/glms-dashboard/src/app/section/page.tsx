"use client"
import AddSection from './_features/AddSection';
import ArrowBackIcon from './assets/ArrowBackIcon';
import { useCreateSectionMutation } from '@/generated/index';

interface FormValues {
  title: string;
  description: string;
  contentImage: string;
}

const section = () => {
  const getSections = typeof window !== 'undefined' ? localStorage.getItem("sections") : null;
  console.log(getSections);

  const [createSection] = useCreateSectionMutation();

  const handleCreateSection = async () => {
    try {
      if (!getSections) {
        console.error("No sections found in localStorage");
        return;
      }

      const sectionData = JSON.parse(getSections);

      await Promise.all(sectionData.map(async (el:FormValues) => {
        const res = await createSection({
          variables: {        
              title: el.title,
              description: el.description  
          }
        });
        console.log("Success", res);
        localStorage.clear()
      }));

    } catch (error) {
      console.error("Error creating section", error);
    }
  };

  return (
    <div className='flex flex-col p-8 bg-[#f7f7f8] justify-center'>
      <div className='flex justify-start gap-1 p-4'>
        <ArrowBackIcon/>
        <p>HTML Intro</p>
      </div>
      <div className='h-fit bg-[#fff] py-2'>
        <AddSection />
        <hr className='w-[100%]' />
        <div className='flex gap-[500px] justify-center items-center py-4'>
          <button onClick={handleCreateSection} className='w-[280px] h-[56px] border text-black border-black rounded-[8px] font-bold text-[18px]'>
            Нийтлэх
          </button>
          <button className='w-[280px] h-[56px] rounded-[8px] font-bold text-[#1C2024] text-[18px] bg-[#D6D8DB]'>
            Хадгалах
          </button>
        </div>
      </div>
      <p className='text-[#3F4145] px-[44%] flex pt-10 pb-2'>© 2023 Pinecone</p>
    </div>
  );
};

export default section;
