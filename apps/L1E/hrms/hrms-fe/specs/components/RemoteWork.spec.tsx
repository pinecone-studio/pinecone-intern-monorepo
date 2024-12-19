import { RemoteWork } from '@/components/RemoteWork';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('RemoteWork', () => {
  it('renders the component', () => {
    render(<RemoteWork availableDays={123} totalRemoteDays={5} />);
    const leaveInfoText = 'Зайнаас ажиллах';
    expect(screen.getByText(leaveInfoText));
  });
});
