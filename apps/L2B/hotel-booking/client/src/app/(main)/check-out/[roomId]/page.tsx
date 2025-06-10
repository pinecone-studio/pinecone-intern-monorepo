'use client';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { calculateTotalPrice, useBookingForm } from '@/utils/booking-form';
import { GuestDetailsForm } from './_features/GuestDetail';
import { ContactInfoForm } from './_features/ContactInfo';
import { BookingSummary } from './_features/BookingHotel';
import { PaymentDialog } from './_features/PaymentDialog';
import { useUpdateContactMutation, useUpdatePersonalInformationMutation } from '@/generated';
import { Button } from '@/components/ui/button';
import Loading from '../../_components/Loading';
import { useState, useEffect, useCallback } from 'react';
import QRCode from 'qrcode';

const BookingForm: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;
  const { formData, setFormData, room, checkInDate, checkOutDate, adults, children, bookingLoading, createBooking, user, userData } = useBookingForm(roomId);
  const [updateContact] = useUpdateContactMutation();
  const [updatePersonalInfo] = useUpdatePersonalInformationMutation();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [showPaymentQR, setShowPaymentQR] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);

  const createPaymentData = useCallback(() => {
    if (!user?._id || !room?.pricePerNight || !checkInDate || !checkOutDate) return null;
    return JSON.stringify({
      userId: user._id,
      roomId,
      amount: calculateTotalPrice(checkInDate, checkOutDate, room.pricePerNight),
      timestamp: new Date().toISOString(),
    });
  }, [checkInDate, checkOutDate, room, user, roomId]);

  const generatePaymentQR = useCallback(async () => {
    const paymentData = createPaymentData();
    if (!paymentData) {
      setShowPaymentQR(false);
      return;
    }
    const url = await QRCode.toDataURL(paymentData, {
      width: 300,
      margin: 2,
      color: { dark: '#1d4ed8', light: '#ffffff' },
    });
    setQrCodeDataUrl(url);
  }, [createPaymentData]);

  useEffect(() => {
    if (showPaymentQR && !qrCodeDataUrl) {
      generatePaymentQR();
    }
  }, [showPaymentQR, qrCodeDataUrl, generatePaymentQR]);

  const needsPersonalUpdate = useCallback(() => {
    if (!userData?.getUser || !user) return false;
    return userData.getUser.firstName !== formData.guestDetails.firstName || userData.getUser.lastName !== formData.guestDetails.lastName;
  }, [formData.guestDetails, user, userData]);

  const needsContactUpdate = useCallback(() => {
    if (!userData?.getUser || !user) return false;
    return userData.getUser.email !== formData.contactInfo.email || userData.getUser.phone !== formData.contactInfo.phone;
  }, [formData.contactInfo, user, userData]);

  const updateUserInfo = useCallback(async (updateFn: any, variables: any) => {
    return updateFn({ variables });
  }, []);

  const handleUpdateUserInfo = useCallback(async () => {
    if (!user || !userData?.getUser) return;
    const updates = [];
    if (needsPersonalUpdate()) {
      updates.push(updateUserInfo(updatePersonalInfo, { id: user._id, ...formData.guestDetails }));
    }
    if (needsContactUpdate()) {
      updates.push(updateUserInfo(updateContact, { id: user._id, input: formData.contactInfo }));
    }
    await Promise.all(updates);
  }, [formData, user, userData, updateContact, updatePersonalInfo, needsPersonalUpdate, needsContactUpdate, updateUserInfo]);
  const submitBooking = useCallback(async () => {
    const result = await createBooking({
      variables: {
        input: {
          userId: user!._id,
          hotelId: room?.hotelId?._id ?? '',
          roomId,
          checkInDate: checkInDate?.toISOString(),
          checkOutDate: checkOutDate?.toISOString(),
          guests: { adults, children },
          totalPrice: calculateTotalPrice(checkInDate, checkOutDate, room?.pricePerNight || 0),
        },
      },
    });
    return result.data?.createBooking;
  }, [createBooking, user, room, roomId, checkInDate, checkOutDate, adults, children]);
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!user) {
        toast.error('User is not logged in', { id: 'error-toast' });
        return;
      }
      await handleUpdateUserInfo();
      if (!paymentVerified) {
        setShowPaymentQR(true);
        return;
      }
      const booking = await submitBooking();
      if (booking) {
        router.push(`/booking-confirmation?bookingId=${booking._id}`);
      }
    },
    [user, handleUpdateUserInfo, paymentVerified, submitBooking, router]
  );
  if (!room) {
    return <Loading />;
  }
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex gap-8 pb-[60px]">
        <div className="lg:col-span-2 max-w-[580px]">
          <form onSubmit={handleSubmit} className="relative">
            <GuestDetailsForm guestDetails={formData.guestDetails} onChange={(details) => setFormData({ ...formData, guestDetails: details })} />
            <ContactInfoForm contactInfo={formData.contactInfo} onChange={(info) => setFormData({ ...formData, contactInfo: info })} />
            <PaymentDialog
              qrCodeDataUrl={qrCodeDataUrl}
              showPaymentQR={showPaymentQR}
              setShowPaymentQR={setShowPaymentQR}
              setPaymentVerified={setPaymentVerified}
              setQrCodeDataUrl={setQrCodeDataUrl}
            />
            <Button data-cy="booking-submit" type="submit" disabled={bookingLoading} className="bg-blue-600 absolute right-0 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {bookingLoading ? 'Processing...' : paymentVerified ? 'Confirm Booking' : 'Proceed to Payment'}
            </Button>
          </form>
        </div>
        <div className="lg:col-span-1 w-[510px]">
          <BookingSummary room={room} checkInDate={checkInDate} checkOutDate={checkOutDate} adults={adults} childrenCount={children} />
        </div>
      </div>
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-5 h-5 rounded-full bg-black"></div>
          <h2 className="text-xl">Pedia</h2>
        </div>
        <p className="text-sm text-gray-600 max-w-[630px]">
          Some hotels require you to cancel more than 24 hours before check-in. All rights reserved. Pedia and the Pedia logo are trademarks of Pedia, LP.
        </p>
      </div>
    </div>
  );
};
export default BookingForm;
