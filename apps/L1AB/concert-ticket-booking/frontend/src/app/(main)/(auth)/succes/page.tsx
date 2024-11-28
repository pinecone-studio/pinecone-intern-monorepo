import { Container } from '@/components';
import { IoMdCheckmark } from 'react-icons/io';

const Page = () => {
  return (
    <Container>
      <div className="h-[48rem] py-[178px] flex justify-center">
        <div className="grid gap-6 h-fit">
          <div className="grid gap-2">
            <div className="bg-[#131313] w-fit rounded-full h-fit p-12 m-auto text-[#00B7F4]">
              <IoMdCheckmark className="h-10 w-10" />
            </div>
            <p className="text-[18px] font-extralight text-white text-center">Захиалга амжилттай</p>
          </div>
          <p className="opacity-50 font-extralight text-white text-center ">
            Таны имэйл хаяг руу <strong className="font-bold">#12374 тасалбар</strong> <br /> амжилттай илгээгдлээ
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Page;
