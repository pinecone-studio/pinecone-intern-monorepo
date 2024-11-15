import { UpdateEventInput } from '../../../generated';
import { EventModel } from '../../../models';

export const updateEvent = async (_: unknown, { input }: { input: UpdateEventInput }) => {
  try {
    const { name, artistName, description, eventDate, eventTime, images, venues, discount } = input;
    const updatedEvent = await EventModel.findByIdAndUpdate(
      { _id: input.eventId },
      {
        name,
        artistName,
        description,
        eventDate,
        eventTime,
        images,
        venues,
        discount,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedEvent) {
      throw new Error('Event not found');
    }

    return updatedEvent;
  } catch (error) {
    throw new Error('Failed to update event');
  }
};
