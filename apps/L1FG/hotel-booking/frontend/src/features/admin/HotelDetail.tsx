/*eslint-disable*/
'use client';

import Link from 'next/link';
import { Sidebar } from '@/features/admin/main/Sidebar';
import { Footer, Header } from '@/components/admin/main';
import { LeftArrow } from '@/components/admin/svg';
import {
  AboutThisProperty,
  Amenities,
  GeneralInfo,
  Images,
  Location,
  Policies,
  PoliciesExtra,
  Questions,
  UpcomingBooking,
  useHotelDetailAmenities,
  useHotelDetailImages,
  useHotelDetailLocation,
  useHotelDetailState,
} from '@/components/admin/hotel-detail';
import { useEditHotelAmenitiesMutation, useEditHotelGeneralInfoMutation, useEditHotelImagesMutation, useEditHotelLocationMutation, useGetHotelByIdQuery } from '@/generated';
import { useParams } from 'next/navigation';
import { RoomTypes } from './hotel-detail/RoomTypes';

export const HotelDetailPage = () => {
  const params = useParams();
  const hotelId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const { data } = useGetHotelByIdQuery({ variables: { getHotelByIdId: hotelId } });
  const hotelData = data?.getHotelById;

  const [editHotelGeneralInfo] = useEditHotelGeneralInfoMutation();
  const [editHotelLocation] = useEditHotelLocationMutation();
  const [editHotelImages] = useEditHotelImagesMutation();
  const [editHotelAmenities] = useEditHotelAmenitiesMutation();
  const { hotelGeneralInfo, setterGeneralInfo } = useHotelDetailState();
  const { hotelLocation, setterLocation } = useHotelDetailLocation();
  const { hotelImages, setterImages } = useHotelDetailImages();
  const { hotelAmenities, setterAmenities } = useHotelDetailAmenities();

  const handleEditHotelAmenities = async () => {
    if (!hotelId) {
      console.error('Hotel ID is missing');
      return;
    }

    const { amenities } = hotelAmenities;

    try {
      const variables = {
        input: {
          id: hotelId,
          amenities,
        },
      };

      await editHotelAmenities({ variables });
    } catch (error) {
      console.error('Error creating hotel:', error);
    }
  };

  const handleEditHotelImages = async () => {
    if (!hotelId) {
      console.error('Hotel ID is missing');
      return;
    }

    const { images } = hotelImages;

    try {
      const variables = {
        input: {
          id: hotelId,
          images: images,
        },
      };

      await editHotelImages({ variables });
    } catch (error) {
      console.error('Error creating hotel:', error);
    }
  };

  const handleEditHotelLocation = async () => {
    if (!hotelId) {
      console.error('Hotel ID is missing');
      return;
    }

    const { locationName } = hotelLocation;

    try {
      const variables = {
        input: {
          id: hotelId,
          locationName,
          location: {
            coordinates: [0],
            type: 'Point',
          },
        },
      };

      await editHotelLocation({ variables });
    } catch (error) {
      console.error('Error creating hotel:', error);
    }
  };

  const handleEditHotelGeneralInfo = async () => {
    if (!hotelId) {
      console.error('Hotel ID is missing');
      return;
    }

    const { name, description, starRating, rating, phoneNumber } = hotelGeneralInfo;

    try {
      const variables = {
        input: {
          id: hotelId,
          name,
          description,
          starRating: starRating ? parseFloat(starRating) : null,
          rating: rating ? parseFloat(rating) : null,
          phoneNumber,
        },
      };

      await editHotelGeneralInfo({ variables });
    } catch (error) {
      console.error('Error creating hotel:', error);
    }
  };

  if (!hotelId) {
    console.error('Hotel ID is missing');
    return;
  }

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
                className="w-8 h-8 flex items-center justify-center rounded-[10px] border border-[#E4E4E7] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#FAFAFA] duration-200"
              >
                <LeftArrow />
              </Link>
              <p className="font-Inter text-[#020617] text-lg font-semibold">{hotelData?.name || hotelGeneralInfo?.name || '-/-'}</p>
            </div>
            <div className="flex gap-4">
              <div className="max-w-[784px] w-full flex flex-col gap-4">
                <UpcomingBooking />
                <RoomTypes />
                <GeneralInfo data={hotelData} {...hotelGeneralInfo} {...setterGeneralInfo} handleEditHotelGeneralInfo={handleEditHotelGeneralInfo} />
                <Amenities data={hotelData} {...hotelAmenities} {...setterAmenities} handleEditHotelAmenities={handleEditHotelAmenities} />
                <AboutThisProperty data={hotelData} hotelRoomData={undefined} />
                <Policies data={hotelData} hotelRoomData={undefined} />
                <PoliciesExtra />
                <Questions />
              </div>
              <div className="max-w-[400px] w-full flex flex-col gap-4">
                <Location data={hotelData} {...hotelLocation} {...setterLocation} handleEditHotelLocation={handleEditHotelLocation} />
                <Images data={hotelData} {...hotelImages} {...setterImages} handleEditHotelImages={handleEditHotelImages} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
