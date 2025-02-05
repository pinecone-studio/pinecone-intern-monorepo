export const Important = () => {
  return (
    <div className="w-full flex justify-between gap-[80px]">
      <h3 className="text-2xl font-semibold font-Inter leading-8">Important information</h3>
      <div className="w-full max-w-[736px] gap-[40px]">
        <div className="flex flex-col gap-3">
          <h4 className="text-xl font-semibold leading-7 font-Inter">Optional extras</h4>
          <ul className="list-disc list-inside text-sm font-normal leading-5 font-Inter">
            <li>Fee for buffet breakfast: approximately USD 20 for adults and USD 10 for children</li> <li>Airport shuttle fee: USD 65.00 per vehicle (roundtrip) </li>
          </ul>
          <p className="text-sm font-normal leading-5 font-Inter">The above list may not be comprehensive. Fees and deposits may not include tax and are subject to change.</p>
        </div>
        <div className="flex flex-col gap-2 mt-12">
          <h4 className="text-xl font-semibold leading-7 font-Inter">You need to know</h4>
          <div className="flex flex-col text-sm font-normal leading-5 font-Inter gap-3">
            <p>Extra-person charges may apply and vary depending on property policy</p>
            <p>Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges</p>
            <p>Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed</p>
            <p>This property accepts credit cards and cash </p> <p>Safety features at this property include a fire extinguisher, a security system, and a first aid kit</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-12">
          <h4 className="text-xl font-semibold leading-7 font-Inter">We should mention</h4>
          <p className="text-sm font-normal leading-5 font-Inter">No pets and no service animals are allowed at this property</p>
        </div>
      </div>
    </div>
  );
};
