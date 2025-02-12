'use client';

import { Footer, Header } from '@/components/admin/main';
import Link from 'next/link';
import { LeftArrow } from '@/components/admin/svg';
import { AboutThisProperty, Amenities, GeneralInfo, Images, Location, Policies, PoliciesExtra, Questions, RoomTypes, UpcomingBooking } from '@/components/admin/add-hotel';
import { Sidebar } from './main/Sidebar';
import { useEditHotelAmenitiesMutation, useEditHotelGeneralInfoMutation, useEditHotelImagesMutation, useEditHotelLocationMutation } from '@/generated';
import { useSearchParams } from 'next/navigation';
import { useHotelAmenities, useHotelImages, useHotelLocation, useHotelState } from '@/components/admin/add-hotel/States';

export const AddHotelPage = () => {
  const searchParams = useSearchParams();
  const hotelId = searchParams.get('id');

  const [editHotelGeneralInfo] = useEditHotelGeneralInfoMutation();
  const [editHotelAmenities] = useEditHotelAmenitiesMutation();
  const [editHotelLocation] = useEditHotelLocationMutation();
  const [editHotelImages] = useEditHotelImagesMutation();
  const { hotelData, setters } = useHotelState();
  const { hotelAmenities, setterAmenities } = useHotelAmenities();
  const { hotelLocation, setterLocation } = useHotelLocation();
  const { hotelImages, setterImages } = useHotelImages();

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
          images,
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

  const handleEditHotelGeneralInfo = async () => {
    if (!hotelId) {
      console.error('Hotel ID is missing');
      return;
    }

    const { name, description, starRating, rating, phoneNumber } = hotelData;

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
              <p className="font-Inter text-[#020617] text-lg font-semibold">{hotelData?.name || 'Hotel name'}</p>
            </div>
            <div className="flex gap-4">
              <div className="max-w-[784px] w-full flex flex-col gap-4">
                <UpcomingBooking />
                <RoomTypes />
                <GeneralInfo {...hotelData} {...setters} handleEditHotelGeneralInfo={handleEditHotelGeneralInfo} />
                <Amenities {...hotelAmenities} {...setterAmenities} handleEditHotelAmenities={handleEditHotelAmenities} />
                <AboutThisProperty />
                <Policies />
                <PoliciesExtra />
                <Questions />
              </div>
              <div className="max-w-[400px] w-full flex flex-col gap-4">
                <Location {...hotelLocation} {...setterLocation} handleEditHotelLocation={handleEditHotelLocation} />
                <Images {...hotelImages} {...setterImages} handleEditHotelImages={handleEditHotelImages} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
