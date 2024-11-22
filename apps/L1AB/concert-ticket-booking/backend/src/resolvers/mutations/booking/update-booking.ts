import { UpdateBookingInput } from '../../../generated';
import { bookingModel } from '../../../models';

export const updateBooking = async (_: unknown, { input }: { input: UpdateBookingInput }) => {
  try {
    const { status } = input;
    const updateCancel = await bookingModel.findByIdAndUpdate(
      { _id: input._id, status },
      {
        status,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updateCancel) {
      throw new Error('Event not found');
    }

    return updateCancel;
  } catch (error) {
    throw new Error('Failed to update event');
  }
};
