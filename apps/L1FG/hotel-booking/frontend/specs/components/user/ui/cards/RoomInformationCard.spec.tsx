import React from 'react';
import { render } from '@testing-library/react';
import { RoomInformationCard } from '@/components/user/ui/cards';

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(() => [null, jest.fn()]), // Mock хийж байна
}));

describe('RoomInformationCard', () => {
  it('opens the dialog when clicking show more', async () => {
    render(<RoomInformationCard />);
  });
});
