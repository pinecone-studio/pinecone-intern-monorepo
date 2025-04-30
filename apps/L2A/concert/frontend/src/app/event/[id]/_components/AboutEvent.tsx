import { Calendar, Clock, MapPin } from 'lucide-react';
import StadiumMap from './StadiumMap';

export const AboutEvent = () => {
  return (
    <div className="w-[80%] text-white min-h-screen p-6 mx-auto space-y-8">
      <div className="flex justify-between items-center text-gray-300">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Calendar size={18} className="text-gray-500" />
            <span>2024.11.15 - 11.18</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={18} className="text-gray-500" />
            <span>19:00</span>
          </div>
        </div>
        <div className="flex items-center gap-1 underline cursor-pointer">
          <MapPin size={18} className="text-gray-500" />
          <span>UG ARENA</span>
        </div>
      </div>
      <div>
        <h2 className="font-semibold mb-1">Special Artist</h2>
        <ul className="list-disc list-inside text-gray-200">
          <li>XAP TAC</li>
          <li>Mr.DoggS</li>
        </ul>
      </div>
      <div>
        <h2 className="font-semibold mb-1">Тоглолтын цагийн хуваарь:</h2>
        <ul className="list-disc list-inside text-gray-200">
          <li>
            <strong>Door open:</strong> 6pm
          </li>
          <li>
            <strong>Music start:</strong> 22pm
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-semibold mb-2">Stage plan:</h2>
        <StadiumMap />
      </div>
    </div>
  );
};

export default AboutEvent;
