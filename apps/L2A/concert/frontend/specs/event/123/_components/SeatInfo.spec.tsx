import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeatInfo from '@/app/event/[id]/_components/SeatInfo';

describe('SeatInfo', () => {
  it('renders the SeatInfo component without crashing', () => {
    render(<SeatInfo />);
    expect(screen.getByText('Тоглолт үзэх өдөрөө сонгоно уу.')).toBeInTheDocument();
  });
});
