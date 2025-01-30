import Link from 'next/link';
import { Sidebar } from '@/features/admin/main/Sidebar';
import { Footer, Header } from '@/components/admin/main';
import { LeftArrow } from '@/components/admin/svg';
import { AboutThisProperty, Amenities, GeneralInfo, Images, Location, Policies, PoliciesExtra, Questions, RoomTypes, UpcomingBooking } from '@/components/admin/hotel-detail';
// import { useGetHotelByIdQuery } from '@/generated';
// import { useParams } from 'next/navigation';

export const HotelDetailPage = () => {
  // const params = useParams();
  // const hotelId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  // const { data } = useGetHotelByIdQuery({ variables: { getHotelByIdId: hotelId } });

  // const hotelData = data?.getHotelById;

  return (
    <div className="flex">
      <Sidebar hotels="active" guests="" />
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <div className="w-full h-full flex justify-center bg-[#F4F4F5]">
          <div className="py-4 flex flex-col gap-4 max-w-[1200px] w-full">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="w-8 h-8 flex items-center justify-center rounded-[10px] border border-[#E4E4E7] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#F4F4F5] duration-200"
              >
                <LeftArrow />
              </Link>
              <p className="font-Inter text-[#020617] text-lg font-semibold">Flower Hotel Ulaanbaatar</p>
            </div>
            <div className="flex gap-4">
              <div className="max-w-[784px] w-full flex flex-col gap-4">
                <UpcomingBooking />
                <RoomTypes />
                <GeneralInfo />
                <Amenities />
                <AboutThisProperty />
                <Policies />
                <PoliciesExtra />
                <Questions />
              </div>
              <div className="max-w-[400px] w-full flex flex-col gap-4">
                <Location />
                <Images />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
