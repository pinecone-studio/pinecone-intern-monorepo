import { Navbar } from '@/app/(admin)/hotels/[hotelid]/[roomId]/[bookingId]/_components/Navbar';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Booking } from '@/generated';

const mockRouter = {
  push: jest.fn(),
};

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

const mockData = {
  hotelId: { _id: 'hotel123' },
  roomId: { _id: 'room456' },
} as Booking;

describe('Admin Navbar component', () => {
  beforeEach(() => {
    mockRouter.push.mockClear();
  });

  it('renders all breadcrumbs with correct structure', () => {
    render(<Navbar data={mockData} />);

    // Verify all elements are present
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Hotels')).toBeInTheDocument();
    expect(screen.getByText('Hotel Detail')).toBeInTheDocument();
    expect(screen.getByText('Room Detail')).toBeInTheDocument();
    expect(screen.getByText('Guest Info')).toBeInTheDocument();

    // Verify separators
    const separators = screen.getAllByText('>');
    expect(separators).toHaveLength(3);
    separators.forEach((separator) => {
      expect(separator).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('navigates to correct paths when breadcrumbs are clicked', () => {
    render(<Navbar data={mockData} />);

    fireEvent.click(screen.getByText('Hotel Detail'));
    expect(mockRouter.push).toHaveBeenCalledWith('/hotels/hotel123');

    fireEvent.click(screen.getByText('Room Detail'));
    expect(mockRouter.push).toHaveBeenCalledWith('/hotels/hotel123/room456');
  });

  it('renders the panel icon', () => {
    render(<Navbar data={mockData} />);
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  describe('handles missing data', () => {
    it('with undefined data', () => {
      render(<Navbar data={undefined} />);

      fireEvent.click(screen.getByText('Hotel Detail'));
      expect(mockRouter.push).toHaveBeenCalledWith('/hotels/undefined');

      fireEvent.click(screen.getByText('Room Detail'));
      expect(mockRouter.push).toHaveBeenCalledWith('/hotels/undefined/undefined');
    });

    it('with null data', () => {
      render(<Navbar data={null} />);

      fireEvent.click(screen.getByText('Hotel Detail'));
      expect(mockRouter.push).toHaveBeenCalledWith('/hotels/undefined');

      fireEvent.click(screen.getByText('Room Detail'));
      expect(mockRouter.push).toHaveBeenCalledWith('/hotels/undefined/undefined');
    });
  });

  it('has proper accessibility attributes', () => {
    render(<Navbar data={mockData} />);
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Breadcrumb navigation');
  });
});
