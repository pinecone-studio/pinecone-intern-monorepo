'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BookingStatus, useUpdateBookingStatusMutation } from '@/generated';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'sonner';

const CancelBookingPage = ({ params }: { params: { cancelBookingId: string } }) => {
  const { cancelBookingId } = params;

  const [updateBookingStatus, { loading }] = useUpdateBookingStatusMutation();
  const [open, setOpen] = useState(false);

  const handleUpdateStatus = async (status: 'checked_out' | 'cancelled') => {
    await updateBookingStatus({
      variables: {
        updateBookingStatusId: cancelBookingId,
        status: status as BookingStatus,
      },
    });
    setOpen(false);
    toast.success('Booking cancelled successfully');
  };

  return (
    <div className="max-w-[690px] h-auto mx-auto bg-white p-6 font-sans">
      <Link href={`/my-booking/${cancelBookingId}`}>
        <Button variant="outline" className="mb-6 border">
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">Cancellation rules</h1>

        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>Free cancellation until Jun 30 at 4:00 pm (Pacific Standard Time (US & Canada); Tijuana).</p>

          <p>If you cancel or change your plans, please cancel your reservation in accordance with the property&#39;s cancellation policies to avoid a no-show charge.</p>

          <p>There is no charge for cancellations made before 4:00 pm (property local time) on Jun 30, 2024.</p>

          <p>
            Cancellations or changes made after 4:00 pm (property local time) on Jun 30, 2024, or no-shows are subject to a property fee equal to 100% of the total amount paid for the reservation.
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Standard Single Room, 1 King Bed</h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium" size="lg">
              Cancel Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[480px] w-full">
            <DialogHeader>
              <DialogTitle>Cancel booking?</DialogTitle>
              <DialogDescription>The property won&#39;t charge you.</DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2  ">
              <Button onClick={() => setOpen(false)} variant={'outline'} disabled={loading} className="px-4 border ">
                Close
              </Button>
              <Button disabled={loading} onClick={() => handleUpdateStatus('cancelled')} variant={'default'} className="border px-4 bg-[#2563EB] hover:bg-[#274b9a]">
                Confirm cancellation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Property Support</h2>

        <p className="text-gray-700">For special request or questions about your reservation, contact Chingis Khan Hotel</p>

        <div className="space-y-2">
          <div>
            <span className="text-gray-500 text-sm">Itinerary:</span>
            <p className="font-mono text-gray-900">72055771948934</p>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <Button variant={'outline'} className="w-full border">
              Call +976 7270 0800
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingPage;
