import { AdvertisedEvent } from '@/components';
import { fireEvent, render } from '@testing-library/react';

describe('AdvertisedEvent', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<AdvertisedEvent />);
    const button1 = getByTestId('AdvertisedEvent-TriggerButton');
    fireEvent.click(button1,);
    const button = getByTestId('Yes-btn');
    fireEvent.click(button, { key: 'Enter' });
    const button2 = getByTestId('No-btn');
    fireEvent.click(button2, { key: 'Enter' });
  });
});
