export const AboutProperty = () => {
  return (
    <div className="w-full flex gap-[80px] justify-between">
      <strong className="text-2xl font-semibold font-Inter leading-8 ">About this Property</strong>
      <div className="w-full max-w-[736px] gap-[40px]">
        <div className="flex flex-col gap-2">
          <strong className="text-xl font-semibold  font-Inter leading-7">Flower Hotel Ulaanbaatar</strong>
          <p className="text-sm font-normal font-Inter leading-5">Upscale hotel located in Downtown Ulaanbaatar</p>
        </div>
        <p className="text-sm font-normal font-Inter leading-5 mt-3">
          Consider a stay at Flower Hotel Ulaanbaatar and take advantage of a coffee shop/cafe, dry cleaning/laundry services, and a bar. Treat yourself to a massage at the onsite spa. Be sure to
          enjoy Mongolian cuisine at one of the 4 on-site restaurants. In addition to a gym and a business center, guests can connect to free in-room WiFi.
        </p>
        <div className="text-sm font-normal font-Inter leading-5 mt-3">
          <p>Additional perks include</p>
          <ul className="list-disc list-inside ">
            <li>Free self parking</li> <li>Buffet breakfast (surcharge), a roundtrip airport shuttle (surcharge), and a front-desk safe</li>
            <li>A banquet hall, newspapers in the lobby, and concierge services</li> <li> Guest reviews speak highly of the helpful staff</li>
          </ul>
          <p>Room features </p> <p>All 180 rooms boast comforts such as premium bedding and bathrobes, in addition to perks like free WiFi and safes.</p>
          <p>Other conveniences in all rooms include: </p>
          <ul className="list-disc list-inside ">
            <li>Rainfall showers, tubs or showers, and free toiletries </li> <li>TVs with satellite channels</li> <li>Electric kettles, ceiling fans, and daily housekeeping </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <strong className="text-xl font-600 font-Inter leading-7">Languages</strong> <p className="text-sm font-normal font-Inter leading-5">English, Japanese, Mongolia, Russian</p>
        </div>
      </div>
    </div>
  );
};
