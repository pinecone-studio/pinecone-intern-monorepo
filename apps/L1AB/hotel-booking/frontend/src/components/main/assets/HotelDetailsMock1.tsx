import React from 'react';

export const HotelDetailsMock1 = () => {
  return (
    <div className="flex  justify-between mb-8 ">
      <h3 className="font-semibold text-2xl w-[264px]">About this property</h3>
      <div className="flex flex-col space-y-4 w-[736px]">
        <h4 className="font-semibold text-xl ">Flower Hotel Ulaanbaatar</h4>
        <p className="text-foreground ">Upscale hotel located in Downtown Ulaanbaatar</p>
        <p className="text-sm">
          Consider a stay at Flower Hotel Ulaanbaatar and take advantage of a coffee shop/cafe, dry cleaning/laundry services, and a bar. Treat yourself to a massage at the onsite spa. Be sure to
          enjoy Mongolian cuisine at one of the 4 on-site restaurants. In addition to a gym and a business center, guests can connect to free in-room WiFi.
        </p>

        <div className="text-sm">
          <p>Additional perks include:</p>
          <ul className="list-disc pl-6 ">
            <li>Free self parking</li>
            <li>Buffet breakfast (surcharge), a roundtrip airport shuttle (surcharge), and a front-desk safe</li>
            <li>A banquet hall, newspapers in the lobby, and concierge services</li>
            <li>Guest reviews speak highly of the helpful staff</li>
          </ul>

          <p>Room features</p>
          <p className="">All 180 rooms boast comforts such as premium bedding and bathrobes, in addition to perks like free WiFi and safes.</p>
          <h3 className="text-md  ">Other conveniences in all rooms include:</h3>
          <ul className="list-disc pl-6 ">
            <li>Rainfall showers, tubs or showers, and free toiletries</li>
            <li>TVs with satellite channels</li>
            <li>Electric kettles, ceiling fans, and daily housekeeping</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-xl">Languages</h3>
          <p className="text-sm">English, Japanese, Mongolian, Russian</p>
        </div>
      </div>
    </div>
  );
};
