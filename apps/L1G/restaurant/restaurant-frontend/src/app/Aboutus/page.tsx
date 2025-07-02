import Image from 'next/image';

const Aboutus = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-[343px] h-[32px] text-center ">
        <p className="text-[#521c0d] text-[20px] font-[100px]">Бидний тухай</p>
      </div>
      <div className="w-[360px] h-[180px]">
        <Image
          className="rounded-md w-[360px] h-[200px] object-cover
        "
          alt=""
          height={180}
          width={360}
          src={'/restaurant.png'}
        />
      </div>
      <div>
        <p className="font-light text-[14px]">
          Манай Мексик хоолны газар нь Мексикийн баялаг соёл, амттай хоолны урлагийг Монголд хүргэх зорилгоор үүсгэн байгуулагдсан. Бид амт чанартай, цэвэр, шинэхэн түүхий эдээр бэлтгэсэн уламжлалт
          Мексик хоолнуудыг та бүхэнд хүргэж байна.
        </p>
      </div>
    </div>
  );
};
export default Aboutus;
