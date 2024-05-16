'use client';
type CourseType = {
  id: string | null | undefined;
  thumbnail: string | null | undefined;
  title: string | null | undefined;
  description: string | null | undefined;
  length: number | null | undefined;
  loading: boolean | null;
};
const Courses = (props: CourseType) => {
  const { id, thumbnail, title, description, length, loading } = props;

  return (
    <div data-testid="courseContain" className=" bg-white cursor-pointer w-[281px] overflow-hidden border-solid border-[1px] border-[#0000001A] rounded-xl relative" key={id}>
      <div className="w-full h-[120px] rounded-md overflow-hidden">
        <img data-testid="lessonImage" src={`${thumbnail}`} alt="lessonImage" />
      </div>
      <div className=" w-full px-[21px] justify-between py-2">
        <p className="text-[16px] font-bold mb-2" data-testid="titleTest" color={'#121316'}>
          {title}
        </p>
        <p className="text-[14px] font-normal overflow-hidden h-[40px] text-[#3F4145]" data-testid="infoTest" color={'#3F4145'}>
          {description}
        </p>
        <div className="py-3 flex justify-between items-center ">
          <div className="flex w-fit bg-[#C1E6CF]  px-3 py-[2px] rounded-xl  text-[14px] font-normal" data-testid="lessonCountTest">
            {loading ? '0' : length}
            {` Lesson${length == 1 || length == 0 ? '' : 's'}`}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Courses;
