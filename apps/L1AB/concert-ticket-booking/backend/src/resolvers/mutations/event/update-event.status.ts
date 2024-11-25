import { UpdateBookingInput } from '../../../generated';
import { EventModel } from '../../../models';

export const updateEventStatus = async (_: unknown, { input }: { input: UpdateBookingInput }) => {
  try {
    const { status } = input;
    const updateEventStatus = await EventModel.findByIdAndUpdate(
      { _id: input._id, status },
      {
        status,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updateEventStatus) {
      throw new Error('Event not found');
    }

    return updateEventStatus;
  } catch (error) {
    throw new Error('Failed to update event');
  }
};
