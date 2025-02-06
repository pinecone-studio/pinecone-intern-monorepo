import SelectDemo from '@/components/ticketReservation/SelectDay';
import { render } from '@testing-library/react';

describe('SelectDemo Component', () => {
  it('render select demo', async () => {
    render(<SelectDemo />);
  });
  // const testDates = ['2024 оны 11 сарын 13 өдөр', '2024 он 11 сарын 14 өдөр', '2024 он 11 сарын 15 өдөр'];

  // it('renders with placeholder text', () => {
  //   render(<SelectDemo />);
  //   expect(screen.getByText('Өдөр сонгох')).toBeInTheDocument();
  // });

  // it('shows all date options when opened', () => {
  //   render(<SelectDemo />);

  //   const trigger = screen.getByRole('combobox');
  //   fireEvent.click(trigger);

  //   testDates.forEach((date) => {
  //     expect(screen.getByText(date)).toBeInTheDocument();
  //   });
  // });

  // it('updates selected value when date is chosen', () => {
  //   render(<SelectDemo />);

  //   const trigger = screen.getByRole('combobox');
  //   fireEvent.click(trigger);

  //   const firstDateOption = screen.getByText(testDates[0]);
  //   fireEvent.click(firstDateOption);

  //   expect(screen.getByText(testDates[0])).toBeInTheDocument();
  //   expect(screen.queryByText('Өдөр сонгох')).not.toBeInTheDocument();
  // });

  // it('matches snapshot when closed', () => {
  //   const { asFragment } = render(<SelectDemo />);
  //   expect(asFragment()).toMatchSnapshot();
  // });

  // it('matches snapshot when open', () => {
  //   const { asFragment } = render(<SelectDemo />);
  //   const trigger = screen.getByRole('combobox');
  //   fireEvent.click(trigger);
  //   expect(asFragment()).toMatchSnapshot();
  // });
});
