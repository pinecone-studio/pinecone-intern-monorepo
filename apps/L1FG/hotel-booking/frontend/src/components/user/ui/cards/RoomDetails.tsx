export const RoomDetails = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="font-Inter text-lg font-semibold leading-7">Accessibility</div>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Access via exterior corridors</li>
            <li>Thin carpet in room</li>
          </ul>
        </div>
        <div>
          <div className="font-Inter text-lg font-semibold leading-7">Bathroom</div>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Bathrobes </li>
            <li>Free toiletries</li>
            <li>Hair dryer </li>
            <li>Private bathroom</li>
            <li>Shower/tub combination </li>
            <li>Slippers</li>
            <li>Toothbrush and toothpaste </li>
            <li>Towels</li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="font-Inter text-lg font-semibold leading-7">Bedroom</div>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Air conditioning</li>
            <li>Bed sheets</li>
            <li>Cribs (infant beds) not available</li>
            <li>Heating</li>
          </ul>
        </div>
        <div>
          <div className="font-Inter text-lg font-semibold leading-7">Bathroom</div>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Cable channels </li>
            <li>TV</li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="font-Inter text-lg font-semibold leading-7">Food and drink</div>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Electric kettle</li>
            <li>Free bottled water</li>
            <li>Minibar (fees may apply)</li>
            <li>Room service (limited)</li>
          </ul>
        </div>
        <div>
          <div className="font-Inter text-lg font-semibold leading-7">Internet</div>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Free WiFi</li>
            <li>Free wired internet</li>
          </ul>
        </div>
      </div>
      <div>
        <div className="font-Inter text-lg font-semibold leading-7">More</div>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Daily housekeeping</li>
          <li>Desk</li>
          <li>Laptop workspace</li>
          <li>Phone</li>
          <li>Safe</li>
          <li>Sitting area</li>
          <li>Soundproofed rooms</li>
          <li>Wardrobe or closet</li>
        </ul>
      </div>
    </>
  );
};
