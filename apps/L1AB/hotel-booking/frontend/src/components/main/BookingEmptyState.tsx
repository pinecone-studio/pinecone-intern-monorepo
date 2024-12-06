import { FaClockRotateLeft } from 'react-icons/fa6';
const BookingEmptyState = () => {
  return (
    <div className="w-full flex justify-center flex-col gap-5">
      <div className="flex justify-center"></div>
      <div className="flex justify-center">
        <div className="w-[960px] h-[954px]  gap-5 flex flex-col p-3">
          <div className="w-[896px] h-[296px] ">
            <h1 className="text-xl font-bold">Booking</h1>
            <div className="flex justify-center flex-col items-center gap-3">
              <div className="w-[140px] h-[140px] bg-black text-white rounded-full items-center flex">Zurag orj irne!!!!!!</div>
              <div>Shagai, you have no upcoming trips. Where are you going next?</div>
              <button className="w-[124px] h-[36px] rounded-xl flex justify-center items-center text-white bg-blue-600">Start Exploring</button>
            </div>
          </div>
          <div className="w-[896px] h-[132px] ">
            <h1 className="text-xl font-bold">Previous Booking</h1>
            <div className="flex flex-col gap-3 justify-center items-center">
              <FaClockRotateLeft className="text-[#71717A]" />
              <h1>No Previous Bookings</h1>
              <h1 className="text-[#71717A]">Your past stays will appear here once completed.</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingEmptyState;
