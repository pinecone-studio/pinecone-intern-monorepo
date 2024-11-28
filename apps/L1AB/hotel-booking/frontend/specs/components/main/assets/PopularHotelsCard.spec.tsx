import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { PopularHotelsCard } from '@/components/main';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('Main Popular Hotels Card', () => {
  it('should render the main popular hotels card', async () => {
    const { getByTestId } = render(<PopularHotelsCard id="1" name="Ub Hotel" image="https://example.com/image1.jpg" rating={3} stars={3} />);

    await waitFor(() => {
      const hotel = getByTestId('hotels-card');
      fireEvent.click(hotel);
    });
  });
});
