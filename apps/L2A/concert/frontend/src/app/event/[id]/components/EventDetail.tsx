import React from 'react';
import AboutEvent from './AboutEvent';
import SeatInfo from './SeatInfo';

const EventDetail = () => {
  return (
    <div className="bg-black">
      <div className="md:flex md:gap-8 w-[80%] mx-auto">
        <div className="md:w-[65%] space-y-6">
          <AboutEvent />
        </div>
        <div className="md:w-[35%] mt-8 md:mt-0">
          <SeatInfo />
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
