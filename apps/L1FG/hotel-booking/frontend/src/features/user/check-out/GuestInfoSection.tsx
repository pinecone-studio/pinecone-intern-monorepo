'use client';
import { WhosCheckingIn } from './WhoCheckingIn';
import { ContactInformation } from './ContactInformation';
import { CardDetail } from './CardDetail';
import { CheckOutRoomCard } from './CheckOutRoomCard';
import { Room } from '@/generated';
import { useState , useEffect } from 'react';
import { ImportantInfo } from './ImportantInfo';
import { useCreateBookingMutation } from '@/generated';
import { useQueryState } from 'nuqs';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { BookingLittle } from '@/features/BookingLittle';

type checkOutProps = {
  room : Room | null | undefined;
}
export type whosCheckingIn = {
  formData: {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneCountry: string;
    phoneNumber: string;
    nameOnCard : string; 
    numberOnCard : string;
    securityCode : number;
    country : string; 
    expirationDate : Date;
    userId : string;
    status : string;
    roomId : string;
    endDate : Date;
    startDate : Date;
    guestRequest : string;
  };
  setFormData: (updatedData: Partial<whosCheckingIn["formData"]>) => void;
};
type TokenPayload = {
  userId: string;
  iat: number;
  exp: number;
};
export const GuestInfoSection = (room : checkOutProps) => {
  const [userId , setUserId] = useState<string>("");
  const [createBooking, { loading, data }] = useCreateBookingMutation();
  const [dateFrom] = useQueryState('dateFrom');
  const [dateTo] = useQueryState('dateTo');
  const dateStart = dateFrom || "";
  const dateEnd = dateTo || "";
  const roomId = room.room?.id || "";
  const hotelId = room.room?.hotelId || "";
  useEffect(() =>{
    console.log("ajdskjdhaks");
    const getToken = localStorage.getItem('token') || '';
    function decodeToken(token: string): TokenPayload {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        return decoded;
      } catch (error) {
        // throw new Error('Failed to decode token'); 
        toast("Алдаа гарлаа")
      }
    }
    const payload = decodeToken(getToken);
    setUserId(payload.userId);
  },[])
  const [whosCheckingInData, setWhosCheckingInData] = useState<whosCheckingIn>({
    formData: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phoneCountry: '+976',
      phoneNumber: '',
      numberOnCard : "",
      nameOnCard : "",
      securityCode : 0,
      country : "",
      expirationDate : new Date(),
      status : "Booked",
      userId : userId,
      endDate : new Date(dateStart),
      startDate : new Date(dateEnd),
      guestRequest : "",
      roomId : roomId
    },
    setFormData: (updatedData: Partial<whosCheckingIn["formData"]>) => {
      setWhosCheckingInData((prev) => ({
        ...prev,
        formData: { ...prev.formData, ...updatedData },
      }));
    },
  });
  const completeBooking = () =>{
    try{
      createBooking({ variables: { input: {email: whosCheckingInData.formData.email,
        firstName: whosCheckingInData.formData.firstName,
        lastName: whosCheckingInData.formData.lastName,
        middleName: whosCheckingInData.formData.middleName,
        country: whosCheckingInData.formData.country,
        phoneNumber: whosCheckingInData.formData.phoneNumber,
        cardName: whosCheckingInData.formData.nameOnCard,
        cardNumber: whosCheckingInData.formData.numberOnCard,
        securityCode: whosCheckingInData.formData.securityCode,
        expirationDate: whosCheckingInData.formData.expirationDate,
        userId: userId,
        status: whosCheckingInData.formData.status,
        roomId : roomId,
        guestRequest : whosCheckingInData.formData.guestRequest,
        hotelId : hotelId,
        startDate : whosCheckingInData.formData.startDate,
        endDate : whosCheckingInData.formData.endDate
      } } })
      toast("Amjilttai Zahialga uuslee");
    }catch(error){
      console.log(error)
    }    
  }
  return (
    <div className="flex justify-center w-screen ">
      <div className="flex gap-16">
        <div className="w-[581px]">
          <ol className="flex flex-col gap-6 text-xl font-semibold leading-7 list-decimal list-inside text-foreground">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <li>Who&#39;s checking in</li>
                <p className="leading-[20px] text-sm text-muted-foreground">
                  Please tell us the name of the guest staying at the hotel as it appears on the ID that they&#39;ll present at check-in. If the guest has more than one last name, please enter them
                  all.
                </p>
              </div>
              <WhosCheckingIn whosCheckingInData={whosCheckingInData}/>
            </div>
            <div className="mt-4 mb-4 border-b"></div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <li>Contact Information</li>
              </div>
              <ContactInformation whosCheckingInData= {whosCheckingInData}/>
            </div>
            <div className="py-4 border-b"></div>
            <div className="flex flex-col gap-8">
              <BookingLittle/>
              <CardDetail whosCheckingInData = {whosCheckingInData}/>
            </div>
            <div className="py-4 border-b"></div>
          </ol>
          <div className="flex flex-col gap-8 pt-10">
            <ImportantInfo/>
            <div className="flex justify-end">
              <button onClick={completeBooking} className="text-primary-foreground leading-5 text-sm font-medium bg-blue-600 rounded-[6px] py-2 px-8">Complete Booking</button>
            </div>
          </div>
        </div>
        <CheckOutRoomCard room ={room.room}/>
      </div>
    </div>
  );
};
