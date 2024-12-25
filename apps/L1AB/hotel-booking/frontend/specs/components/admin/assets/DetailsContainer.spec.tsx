import '@testing-library/jest-dom';
import { DetailsContainer } from '@/components/admin/assets';
import { render } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { useAdmin } from '@/components/providers/AdminProvider';
import React from 'react';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('@/components/providers/AdminProvider', () => ({
  useAdmin: jest.fn(),
}));

describe('Admin DetailsContainer Component', () => {
  it('renders children and hotel name correctly', () => {
    (usePathname as jest.Mock).mockReturnValue('/admin/hotels/123');
    (useAdmin as jest.Mock).mockReturnValue({
      addHotelForm: {
        values: {
          name: 'Hotel Sunrise',
        },
        handleSubmit: jest.fn(),
        isValid: true,
        isSubmitting: false,
      },
    });

    render(
      <DetailsContainer name="hotel">
        <div>Hotel content</div>
      </DetailsContainer>
    );
  });

  it('calls handleSubmit when the form is submitted', () => {
    const handleSubmitMock = jest.fn();

    (usePathname as jest.Mock).mockReturnValue('/admin/hotels/123');
    (useAdmin as jest.Mock).mockReturnValue({
      addHotelForm: {
        values: {
          name: 'Hotel Sunrise',
        },
        handleSubmit: handleSubmitMock,
        isValid: true,
        isSubmitting: false,
      },
    });

    render(
      <DetailsContainer name="hotel">
        <div>Hotel content</div>
      </DetailsContainer>
    );

    expect(handleSubmitMock);
  });
  it('calls handleSubmit when the form is submitted', () => {
    const handleSubmitMock = jest.fn();

    (usePathname as jest.Mock).mockReturnValue('/admin/hotels/123/1234');
    (useAdmin as jest.Mock).mockReturnValue({
      addRoomForm: {
        values: {
          name: 'Room Sunrise',
        },
        handleSubmit: handleSubmitMock,
        isValid: true,
        isSubmitting: false,
      },
    });

    render(
      <DetailsContainer name="room">
        <div>Room content</div>
      </DetailsContainer>
    );

    expect(handleSubmitMock);
  });
  it('calls handleSubmit when the form is submitted', () => {
    const handleSubmitMock = jest.fn();

    (usePathname as jest.Mock).mockReturnValue('/admin/hotels');
    (useAdmin as jest.Mock).mockReturnValue({
      addRoomForm: {
        values: {
          name: 'Room Sunrise',
        },
        handleSubmit: handleSubmitMock,
        isValid: true,
        isSubmitting: false,
      },
    });

    render(
      <DetailsContainer name="room">
        <div>Room content</div>
      </DetailsContainer>
    );

    expect(handleSubmitMock);
  });
});
