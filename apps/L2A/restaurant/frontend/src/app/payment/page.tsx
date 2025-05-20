import Image from "next/image";

const PaymentSelection = () => {
  return (
    <div data-testid="div" className="flex items-center justify-center bg-[#EEEEF0] h-screen">
      <div className="w-96 p-6 rounded-2xl">
        <h2 data-testid="Төлбөрийн хэрэгсэл" className="text-center text-[20px] font-medium text-[#441500] my-12">Төлбөрийн хэрэгсэл <br/> сонгоно уу</h2>
        <div className="mb-4">
          <select className="w-full p-2 mb-8 border border-gray-300 rounded-lg bg-[#FFFFFF] shadow-sm">
            <option>Авч явах</option>
            <option>Эндээ идэх</option>
          </select>
        </div>
        <div className="flex justify-around mb-12 gap-4">
        <button data-testid="qpay-button" className="bg-[#FFFFFF] shadow-sm p-3 rounded-lg w-24 flex justify-center items-center flex-col gap-2"><Image width={40} height={40} alt="qpay" src={"/qpay.png"}/><p>Qpay</p></button>
          <button data-testid="socialpay-button" className="bg-[#FFFFFF] shadow-sm p-3 rounded-lg w-24 flex justify-center items-center flex-col gap-2"><Image width={40} height={40}  alt="socialpay" src={"/socialpay.png"}/><p>SocialPay</p></button>
          <button data-testid="wallet-button" className="bg-[#FFFFFF] shadow-sm p-3 rounded-lg w-24 flex justify-center items-center flex-col gap-2"><Image width={40} height={40}  alt="favicon" src="/favicon.ico"/><p>Хэтэвч</p></button>
        </div>
        <div className="text-gray-700 text-sm">
          <p className="flex justify-between mb-1 text-[#8B8E95] text-[14px] font-light"><span>Захиалгын нийт дүн:</span> <span>53,000₮</span></p>
          <p className="flex justify-between mb-1 text-[#8B8E95] text-[14px] font-light"><span>Хоолны сав:</span> <span>4,000₮</span></p>
          <hr className="my-2" />
          <p className="flex justify-between font-medium text-base"><span className="text-[#8B8E95]">Төлөх дүн:</span> <span>53,000₮</span></p>
        </div>
      </div>
    </div>
  );
};
export default PaymentSelection