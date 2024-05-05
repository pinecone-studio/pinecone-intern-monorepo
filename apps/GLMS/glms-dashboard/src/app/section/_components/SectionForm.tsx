import { Section } from "@/generated";

const SectionForm = (props:Section) => {
  const {  title, description , contentImage} = props;
  return (
    <div  data-testid="section-form" className="flex flex-col gap-[4px] bg-[#fff] border-1 rounded-[4px] justify-center items-center p-6">
      <div className="'flex flex-col gap-4 border-2 border-dashed rounded-4 p-8 border-[#D6D8DB] rounded-[8px]">
        <div className="flex flex-col py-2">
          <p className="font-bold">Хэсгийн гарчиг</p>
          <p data-testid="title"  className="w-[588px] h-fit border rounded-[4px] p-2" >{title}</p>
        </div>
        <div className="flex flex-col py-2">
          <p className="font-bold">Дэлгэрэнгүй</p>
          <p data-testid="description" className="w-[588px] h-fit border rounded-[4px] p-2" >{description}</p>
        </div>
        <div className="flex flex-col py-2">
          <p className="font-bold"> Хэсгийн зураг</p>
          <div className="w-[588px] h-60 border-2 border-dashed border-gray-300 rounded-xl flex flex-col justify-center items-center">
            <div data-testid="contentImage" className="flex items-center justify-center">
             <img src={`${contentImage}`} alt="sectionImage" ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionForm;
