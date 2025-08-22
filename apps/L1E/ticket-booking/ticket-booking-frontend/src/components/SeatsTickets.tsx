import { TicketBuy } from './TicketBuy';
import Image from 'next/image';

export const SeatsTickets = () => {
  return (
    <div className="w-full flex gap-8 py-12 px-[212px]">
      <div className="w-[65%] space-y-6">
        <div className="flex justify-between">
          <div className="flex gap-6">
            <div className="flex gap-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10.6667 1.33325V3.99992M5.33333 1.33325V3.99992M2 6.66658H14M3.33333 2.66659H12.6667C13.403 2.66659 14 3.26354 14 3.99992V13.3333C14 14.0696 13.403 14.6666 12.6667 14.6666H3.33333C2.59695 14.6666 2 14.0696 2 13.3333V3.99992C2 3.26354 2.59695 2.66659 3.33333 2.66659Z"
                  stroke="#FAFAFA"
                  strokeOpacity="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-white text-base font-normal">2024.11.15 - 11.18</p>
            </div>
            <div className="flex gap-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g clipPath="url(#clip0_2191_2297)">
                  <path
                    d="M7.99992 3.99992V7.99992L10.6666 9.33325M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                    stroke="#FAFAFA"
                    strokeOpacity="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2191_2297">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="text-white text-base font-normal">19:00</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13.3334 6.66658C13.3334 10.6666 8.00008 14.6666 8.00008 14.6666C8.00008 14.6666 2.66675 10.6666 2.66675 6.66658C2.66675 5.2521 3.22865 3.89554 4.22885 2.89535C5.22904 1.89516 6.58559 1.33325 8.00008 1.33325C9.41457 1.33325 10.7711 1.89516 11.7713 2.89535C12.7715 3.89554 13.3334 5.2521 13.3334 6.66658Z"
                stroke="#FAFAFA"
                strokeOpacity="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.00008 8.66658C9.10465 8.66658 10.0001 7.77115 10.0001 6.66658C10.0001 5.56202 9.10465 4.66659 8.00008 4.66659C6.89551 4.66659 6.00008 5.56202 6.00008 6.66658C6.00008 7.77115 6.89551 8.66658 8.00008 8.66658Z"
                stroke="#FAFAFA"
                strokeOpacity="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-white text-base font-normal underline underline-offset-4">UG ARENA</p>
          </div>
        </div>

        <div className="space-y-2 text-white">
          <h6 className="text-[#FAFAFA] text-sm font-light">Special Artist</h6>
          <div className="[&>*]:text-sm [&>*]:font-semibold">
            <p>• XAP TAC</p>
            <p>• Mr.Doggs</p>
          </div>
          <h6 className="text-[#FAFAFA] text-sm font-light">Тоглолтийн цагийн хуваарь:</h6>
          <div className="[&>*]:text-sm [&>*]:font-semibold">
            <p>• Door open: 6 PM</p>
            <p>• Music start: 22 PM</p>
          </div>
        </div>

        <div className="w-full text-white">
          <h6>Stage Plan:</h6>
          <Image src="/assets/stage.png" className="w-full object-contain object-center" alt="img" width={100} height={100} />
        </div>
      </div>

      <TicketBuy />
    </div>
  );
};
