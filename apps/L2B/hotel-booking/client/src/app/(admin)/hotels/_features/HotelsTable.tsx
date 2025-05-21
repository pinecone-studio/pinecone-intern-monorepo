import Image from 'next/image';
import { Star } from 'lucide-react';

// Mock data for the hotels
const hotelData = [
  {
    id: '0001',
    name: 'Toyoko Inn Ulaanbaatar',
    image: '/placeholder.svg?height=60&width=60',
    rooms: ['Single', 'Deluxe', 'Standard'],
    stars: 5,
    userRating: 8.4,
  },
  {
    id: '0001',
    name: 'Edelweiss Art Hotel',
    image: '/placeholder.svg?height=60&width=60',
    rooms: ['Single', 'Deluxe', 'Standard'],
    stars: 5,
    userRating: 8.6,
  },
  {
    id: '0001',
    name: 'Flower Hotel Ulaanbaatar',
    image: '/placeholder.svg?height=60&width=60',
    rooms: ['Single', 'Deluxe', 'Standard'],
    stars: 5,
    userRating: 8.2,
  },
  {
    id: '0001',
    name: 'Hotel Nine',
    image: '/placeholder.svg?height=60&width=60',
    rooms: ['Single', 'Deluxe', 'Standard'],
    stars: 5,
    userRating: 8.1,
  },
];

const HotelsTable = () => {
  return (
    <div className="w-full overflow-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="text-left py-3 px-4 font-medium text-gray-500">ID</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">
              Rooms
              <span className="ml-1 inline-block">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 4L12 8H4L8 4Z" fill="#D1D5DB" />
                  <path d="M8 12L4 8H12L8 12Z" fill="#D1D5DB" />
                </svg>
              </span>
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">
              Stars Rating
              <span className="ml-1 inline-block">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 4L12 8H4L8 4Z" fill="#D1D5DB" />
                  <path d="M8 12L4 8H12L8 12Z" fill="#D1D5DB" />
                </svg>
              </span>
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">
              User Rating
              <span className="ml-1 inline-block">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 4L12 8H4L8 4Z" fill="#D1D5DB" />
                  <path d="M8 12L4 8H12L8 12Z" fill="#D1D5DB" />
                </svg>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {hotelData.map((hotel, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-4 px-4 text-sm">{hotel.id}</td>
              <td className="py-4 px-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 flex-shrink-0 mr-3 rounded overflow-hidden">
                    <Image src={hotel.image || '/placeholder.svg'} alt={hotel.name} width={48} height={48} className="h-full w-full object-cover" />
                  </div>
                  <div className="text-sm font-medium">{hotel.name}</div>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex flex-wrap gap-1">
                  {hotel.rooms.map((room, roomIndex) => (
                    <span key={roomIndex} className="px-2 py-1 text-xs rounded-md bg-gray-100">
                      {room}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-sm">{hotel.stars}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="text-sm font-medium">
                  {hotel.userRating}
                  <span className="text-gray-500 font-normal">/10</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotelsTable;
