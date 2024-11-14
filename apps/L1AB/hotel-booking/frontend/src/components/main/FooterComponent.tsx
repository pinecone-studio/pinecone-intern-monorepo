import { MdOutlinePhone } from 'react-icons/md';
import { CiHeadphones, CiMail } from 'react-icons/ci';
// import img from '../icon/cards-cc_visa.png';
// import Image from 'next/image';

export const FooterComponent = () => {
  return (
    <div className="flex justify-center m-auto">
      <div className="w-screen  border-2 border-black justify-center flex items-center p-10">
        <div className="w-[1280px] ">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <button className="w-[20px] h-[20px] border bg-black rounded-full"></button>
                  <h1 className="font-bold">Pedia</h1>
                </div>
                <h1>© 2024 Booking Mongolia. All Rights Reserved.</h1>
              </div>
              <div className=" flex flex-col bottom-1">
                <div className="w-[188px] h-[56px] border border-black">
                  {/* <Image src={img} width={24} height={24} alt="" /> */}
                  <p>kkk</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <h1 className="text-[#09090b] ">Contact Information</h1>
              <div className="flex gap-2 mt-3">
                <div className="flex items-center">
                  <CiMail className="w-[16px] h-[16px]" />
                </div>
                <div>
                  <h1 className="font-bold">Email:</h1>
                  <h1>support@pedia.mn</h1>
                </div>
              </div>
              <div className="flex gap-2 mt-5">
                <div className="flex items-center">
                  <MdOutlinePhone className="w-[16px] h-[16px]" />
                </div>
                <div>
                  <h1 className="font-bold">Phone:</h1>
                  <h1>+976 (11) 123-4567</h1>
                </div>
              </div>
              <div className="flex gap-2 mt-5">
                <div className="flex items-center">
                  <CiHeadphones className="w-[16px] h-[16px]" />
                </div>
                <div>
                  <h1 className="font-bold">Customer Support:</h1>
                  <h1>Available 24/7</h1>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h1>Follow us</h1>
              <h1>Facebook</h1>
              <h1>Instagram</h1>
              <h1>Twitter</h1>
              <h1>Youtube</h1>
            </div>
            <div className="flex flex-col gap-4">
              <h1>Policies</h1>
              <h1>Terms & Conditions</h1>
              <h1>Privacy</h1>
              <h1>Cookies</h1>
              <h1>Cancellation Policy</h1>
            </div>
            <div className="flex flex-col gap-5">
              <h1>Other</h1>
              <h1>About us </h1>
              <h1>Careers</h1>
              <h1>Travel guides</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
