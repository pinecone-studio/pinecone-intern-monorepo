import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeatInfo from '@/app/event/[id]/components/SeatInfo';

describe('SeatInfo', () => {
  it('renders the SeatInfo component without crashing', () => {
    render(<SeatInfo />);
    expect(screen.getByText('Тоглолт үзэх өдөрөө сонгоно уу.')).toBeInTheDocument();
  });

  // it('renders the date selection dropdown with placeholder', () => {
  //   render(<SeatInfo />);
  //   const selectTrigger = screen.getByTestId('tag-trigger');
  //   expect(selectTrigger).toBeInTheDocument();
  //   expect(selectTrigger).toHaveTextContent('Өдөрөө сонгоно уу.');
  // });

  // it('renders all date options when the dropdown is opened', () => {
  //   render(<SeatInfo />);
  //   const selectTrigger = screen.getByTestId('tag-trigger');

  //   fireEvent.click(selectTrigger);

  //   expect(screen.getByText('11 сарын 15')).toBeInTheDocument();
  //   expect(screen.getByText('11 сарын 16')).toBeInTheDocument();
  //   expect(screen.getByText('11 сарын 17')).toBeInTheDocument();
  //   expect(screen.getByText('11 сарын 18')).toBeInTheDocument();
  // });
});
