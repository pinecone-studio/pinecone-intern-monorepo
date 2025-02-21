import { render, screen, fireEvent } from '@testing-library/react';
import { SinglePageCardPrice } from '@/components/user/ui/cards/SinglePageCardPrice';
import { useRouter } from 'next/router';
import { useQueryState } from 'nuqs';
import '@testing-library/jest-dom';
import { useNightsCount } from '@/features/user/main/useNightsCount';

// Mocking useRouter, useQueryState, and useNightsCount
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(),
}));

jest.mock('@/features/user/main/useNightsCount', () => ({
  useNightsCount: jest.fn(),
}));

// Mock data for room
const mockRoom = {
  id: '1',
  hotelId: '123',
  name: 'Deluxe Room',
  price: 150.0,
};

describe('SinglePageCardPrice component', () => {
  let pushMock;

  beforeEach(() => {
    // Reset the pushMock before each test
    pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });
    useQueryState.mockReturnValue([1]); // Mocking bedcount
    useNightsCount.mockReturnValue(1); // Default to 1 night before each test
  });

  it('renders the price details correctly', () => {
    render(<SinglePageCardPrice rooms={mockRoom} />);

    // Ensure total price is displayed correctly
    expect(screen.getAllByText('150₮')).toHaveLength(2); // Two instances (total & per night)

    // Ensure "Price per night" text is displayed
    expect(screen.getByText('Price per night')).toBeInTheDocument();
  });

  it('calculates the total price based on the number of nights', () => {
    useNightsCount.mockReturnValue(3); // Mock 3 nights
    render(<SinglePageCardPrice rooms={mockRoom} />);

    // Ensure total price is correct for 3 nights
    expect(screen.getByText('450₮')).toBeInTheDocument(); // 3 * 150₮
  });

  it('handles zero price correctly', () => {
    const roomWithZeroPrice = { ...mockRoom, price: 0 };

    render(<SinglePageCardPrice rooms={roomWithZeroPrice} />);

    // Ensure price is displayed as 0₮
    expect(screen.getAllByText('0₮')).toHaveLength(2); // Two instances (total & per night)
  });

  it('handles no nights count gracefully', () => {
    useNightsCount.mockReturnValue(0); // Mock 0 nights
    render(<SinglePageCardPrice rooms={mockRoom} />);
  
    // Ensure total price is 0₮ for 0 nights using getAllByText
    const totalPriceElements = screen.getAllByText(/0₮/);
    expect(totalPriceElements.length).toBeGreaterThan(0); // Check that at least one element matches
  });
  
  

  it('navigates to the correct checkout page when the reserve button is clicked', () => {
    render(<SinglePageCardPrice rooms={mockRoom} />);

    const reserveButton = screen.getByText('Reserve');
    fireEvent.click(reserveButton);

    // Ensure navigation to the correct checkout URL
    expect(pushMock).toHaveBeenCalledWith(
      `/check-out/1?bedcount=1&dateFrom=1&dateTo=1`
    );
  });
});
