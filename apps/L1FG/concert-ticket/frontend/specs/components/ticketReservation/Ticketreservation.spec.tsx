import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TicketReservation } from '@/components/ticketReservation/Ticketreservation';

describe('TicketReservation Component', () => {
  const getErrorMessage = () => screen.queryByTestId('standart-count');
  it('renders ticket information (price and available count)', async () => {
    render(<TicketReservation vip={20} standart={20} rear={20} />);

    expect(
      screen.getByText((content) => {
        return content.startsWith('Энгийн тасалбар') && content.includes('(20)');
      })
    ).toBeInTheDocument();

    expect(screen.getByText('99000₮')).toBeInTheDocument();

    expect(
      screen.getByText((content) => {
        return content.startsWith('Арын тасалбар') && content.includes('(20)');
      })
    ).toBeInTheDocument();

    expect(screen.getByText('129000₮')).toBeInTheDocument();

    expect(
      screen.getByText((content) => {
        return content.startsWith('VIP тасалбар') && content.includes('(20)');
      })
    ).toBeInTheDocument();

    expect(screen.getByText('159000₮')).toBeInTheDocument();
  });

  it(' decrements standard ticket count', async () => {
    const { getByTestId } = render(<TicketReservation vip={20} standart={20} rear={20} />);
    const standartDecrement = getByTestId('standart-decrement');
    fireEvent.click(standartDecrement);
  });

  it(' increment standard ticket count', async () => {
    const { getByTestId } = render(<TicketReservation vip={1} standart={1} rear={1} />);
    const standartIncrement = getByTestId('standart-increment');
    fireEvent.click(standartIncrement);
  });

  it(' decrements vip ticket count', async () => {
    const { getByTestId } = render(<TicketReservation vip={20} standart={20} rear={20} />);
    const vipDecrement = getByTestId('vip-decrement');
    fireEvent.click(vipDecrement);
  });

  it(' increment vip ticket count', async () => {
    const { getByTestId } = render(<TicketReservation vip={20} standart={20} rear={20} />);
    const vipIncrement = getByTestId('vip-increment');
    fireEvent.click(vipIncrement);
  });

  it(' decrements rear ticket count', async () => {
    const { getByTestId } = render(<TicketReservation vip={20} standart={20} rear={20} />);
    const rearDecrement = getByTestId('rear-decrement');
    fireEvent.click(rearDecrement);
  });

  it(' increment raer ticket count', async () => {
    const { getByTestId } = render(<TicketReservation vip={20} standart={20} rear={20} />);
    const rearIncrement = getByTestId('rear-increment');
    fireEvent.click(rearIncrement);
  });

  it('error message appears when standard tickets are sold out', () => {
    const { getByTestId } = render(<TicketReservation vip={20} standart={20} rear={20} />);

    const incrementButton = getByTestId('standart-increment');

    for (let i = 0; i < 20; i++) {
      fireEvent.click(incrementButton);
    }

    expect(getErrorMessage()).toBeInTheDocument();
    expect(getErrorMessage()).toHaveTextContent('20-ш тасалбар захиалах боломжгүй байна.');
  });
  it('error message appears when rear tickets are sold out', () => {
    const { getByTestId } = render(<TicketReservation vip={20} standart={20} rear={20} />);

    const incrementButton = getByTestId('rear-increment');

    for (let i = 0; i < 20; i++) {
      fireEvent.click(incrementButton);
    }

    expect(getErrorMessage()).toBeInTheDocument();
    expect(getErrorMessage()).toHaveTextContent('0-ш тасалбар захиалах боломжгүй байна.');
  });
});
