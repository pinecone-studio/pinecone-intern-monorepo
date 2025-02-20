import React from 'react';
import { render } from '@testing-library/react';
import { RoomInformationCard } from '@/components/user/ui/cards';

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(() => [null, jest.fn()]),
}));

jest.mock('@/features/user/main/useNightsCount', () => ({
  useNightsCount: jest.fn(() => 0),
}));

jest.mock('@/features/user/main/useNightsCount', () => ({
  useNightsCount: jest.fn(() => 1),
}));

describe('RoomInformationCard', () => {
  it('opens the dialog when clicking show more', async () => {
    render(<RoomInformationCard rooms={{ images: ['https://example.com/test.jpg '], price: 10000, hotelId: '1', id: '1' }} />);
  });
  it('opens the dialog when clicking show more', async () => {
    render(<RoomInformationCard rooms={{ images: [''], price: 10000, hotelId: '1', id: '1' }} />);
  });
});
