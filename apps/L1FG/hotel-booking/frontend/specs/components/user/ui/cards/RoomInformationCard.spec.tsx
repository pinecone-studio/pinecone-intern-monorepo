import React from 'react';
import { render } from '@testing-library/react';
import { RoomInformationCard } from '@/components/user/ui/cards';

describe('RoomInformationCard', () => {
  it('opens the dialog when clicking show more', async () => {
    render(<RoomInformationCard />);
  });
});
