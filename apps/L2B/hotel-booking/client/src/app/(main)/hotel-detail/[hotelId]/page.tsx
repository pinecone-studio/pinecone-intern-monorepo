'use client';
import { Footer } from '@/app/_components/Footer';
import SearchFilter from '../../_components/SeacrhFilter';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Hotel, useHotelQuery } from '@/generated';

const Detail = ({ params }: { params: { hotelId: string } }) => {
  const [hotel, setHotel] = useState<Hotel | null | undefined>();
  const { data } = useHotelQuery({ variables: { hotelId: params.hotelId } });

  useEffect(() => {
    setHotel(data?.hotel);
  }, [data?.hotel]);
  console.log(hotel);
  return (
    <div className="mt-12">
      <SearchFilter />
      <div className="flex w-[1160px] h-[434px] justify-center m-auto mt-4 ">
        <div className="w-[579px] h-[434px] ">{hotel?.images?.[0] && <Image src={hotel.images[0]} width={1000} height={1000} alt="img" className="object-cover h-full rounded-sm" />}</div>
        <div className="flex border gap-1.5 ml-1.5">
          <div className="flex flex-col gap-1.5 ">
            {hotel?.images?.slice(1, 3).map((image, index) => (
              <Image key={index} className="w-[286px] h-[214px] object-cover rounded-sm" src={image || ''} alt="" width={400} height={200} />
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            {hotel?.images?.slice(3, 5).map((image, index) => (
              <Image width={111} height={111} key={index} className="w-[286px] h-[214px] object-cover rounded-sm" src={image || ''} alt="" />
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{hotel?.name}</h1>

            {typeof hotel?.starRating === 'number' && (
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < (hotel?.starRating ?? 0) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                ))}
              </div>
            )}

            <p className="text-gray-700 mb-6">{hotel?.description}</p>

            <div className="inline-flex items-center bg-blue-600 text-white px-3 rounded-full mb-6">
              <span className="font-medium text-[14px] ">{hotel?.rating}</span>
            </div>
            <span className="ml-2">Excellent</span>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold mb-6">Most popular facilities</h2>

              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4">
                {hotel?.amenities?.map((anime, index) => (
                  <ul key={index} className="flex items-center">
                    • {anime}
                  </ul>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-1 flex flex-col gap-4">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold ">Location</h2>
                <div className="bg-gray-50 p-2 rounded-md">
                  <p className="">{hotel?.location}</p>
                  <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    View in Google Maps
                  </a>
                </div>
              </CardContent>
            </Card>
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <div className="flex items-start">
              <Phone className="h-5 w-5 mr-3 mt-1" />
              <div>
                <p className="text-gray-500">Phone Number</p>
                <p className="font-medium">{hotel?.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Detail;
