import React from 'react';
export const HotelDetailsAboutThisProperty = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold">About this property</h3>
      <div className="border-t w-full my-6"></div>
      <div className="w-full text-sm">
        <h3 className="mt-2 font-semibold text-lg mb-2">Flower Hotel Ulaanbaatar</h3>

        <p className="mb-4">Upscale hotel located in Downtown Ulaanbaatar</p>
        <p className="mb-4">
          Consider a stay at Flower Hotel Ulaanbaatar and take advantage of a coffee shop/cafe, dry cleaning/laundry services, and a bar. Treat yourself to a massage at the onsite spa. Be sure to
          enjoy Mongolian cuisine at one of the 4 on-site restaurants. In addition to a gym and a business center, guests can connect to free in-room WiFi.
        </p>

        <p>Additional perks include:</p>
        <ul className="list-disc list-inside space-y-1 ml-[7px] text-gray-800">
          <li>Free self parking</li>
          <li>Buffet breakfast (surcharge), a roundtrip airport shuttle (surcharge), and a front-desk safe</li>
          <li>A banquet hall, newspapers in the lobby, and concierge services</li>
          <li>Guest reviews speak highly of the helpful staff</li>
          <li>Free airport shuttle</li>
        </ul>
        <p>
          Room features <br /> All 180 rooms boast comforts such as premium bedding and bathrobes, in addition to perks like free WiFi and safes.
        </p>
        <p>Other conveniences in all rooms include:</p>
        <ul className="list-disc list-inside space-y-1 ml-[7px] text-gray-800">
          <li>Rainfall showers, tubs or showers, and free toiletries</li>
          <li>TVs with satellite channels</li>
          <li>Electric kettles, ceiling fans, and daily housekeeping</li>
        </ul>
      </div>

      <div className="mt-8 gap-2 text-sm">
        <h1 className="font-semibold text-lg">Languages</h1>
        <p>English, Japanese, Mongolian, Russian</p>
      </div>
    </div>
  );
};
