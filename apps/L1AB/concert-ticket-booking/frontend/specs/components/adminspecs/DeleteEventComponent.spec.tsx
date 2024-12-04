import { DeletedEvent } from '@/components/admincomponents/DeleteEventButton';
import { UpdateEventStatusDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
const mockEmptyStatus: MockedResponse = {
  request: {
    query: UpdateEventStatusDocument,
    variables: {
      input: { _id: '1', status: 'Regular' },
    },
  },
  result: {
    data: {
      updateventstatus: [
        {
          _id: '2',
          name: 'Event 2',
          artistName: ['Artist 2'],
          description: 'Event description',
          eventDate: '2022-02-01',
          eventTime: '19:00',
          images: ['image_url_3', 'image_url_4'],
          venues: [
            { name: 'VIP', quantity: 150, price: 200 },
            { name: 'fanzone', quantity: 150, price: 200 },
            { name: 'regular', quantity: 150, price: 200 },
          ],
          discount: 15,
        },
      ],
    },
  },
};

const mockHighlightedStatus: MockedResponse = {
  request: {
    query: UpdateEventStatusDocument,
    variables: {
      input: { _id: '1', status: 'Deleted' },
    },
  },
  result: {
    data: {
      updateventstatus: [
        {
          _id: '2',
          status: 'Deleted',
        },
      ],
    },
  },
};

describe('DeleteEvent', () => {
  it('should update the status to "Deleted" and close the dialog when "Тийм" is selected', async () => {
    render(
      <MockedProvider mocks={[mockHighlightedStatus]} addTypename={false}>
        <DeletedEvent eventId="1" />
      </MockedProvider>
    );

    const triggerButton = screen.getByTestId('AdvertisedEvent-TriggerButton');
    fireEvent.click(triggerButton);

    const yesButton = screen.getByTestId('Yes-btn');
    fireEvent.click(yesButton);

    const saveButton = screen.getByTestId('btn');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.queryByTestId('AdvertisedEvent-DialogContent'));
    });
  });

  it('should update the status to empty and close the dialog when "Үгүй" is selected', async () => {
    render(
      <MockedProvider mocks={[mockEmptyStatus]} addTypename={false}>
        <DeletedEvent eventId="1" />
      </MockedProvider>
    );

    const triggerButton = screen.getByTestId('AdvertisedEvent-TriggerButton');
    fireEvent.click(triggerButton);

    const noButton = screen.getByTestId('No-btn');
    fireEvent.click(noButton);

    const saveButton = screen.getByTestId('btn');
    fireEvent.click(saveButton);
  });
  it('should update the status to "Deleted" and close the dialog when "Тийм" is selected', async () => {
    render(
      <MockedProvider mocks={[mockHighlightedStatus]} addTypename={false}>
        <DeletedEvent eventId="1" />
      </MockedProvider>
    );

    const triggerButton = screen.getByTestId('AdvertisedEvent-TriggerButton');
    fireEvent.click(triggerButton);

    const exitButton = screen.getByTestId('exit');
    fireEvent.click(exitButton);
  });
});
