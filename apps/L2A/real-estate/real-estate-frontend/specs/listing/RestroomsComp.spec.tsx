import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RestRoomsComp from '@/app/listing/_components/RestRoomsComp';

describe('RestRoomsComp', () => {
  it('renders Ариун цэврийн өрөө label and 3 options', () => {
    const setTotalRestrooms = jest.fn();
    render(<RestRoomsComp
         restrooms="" setTotalRestrooms={setTotalRestrooms} />);

    expect(screen.getByText('Ариун цэврийн өрөө')).toBeInTheDocument();
    [1, 2, 3].forEach((bath) => {
      expect(screen.getByRole('checkbox', { name: `${bath} өрөө` })).toBeInTheDocument();
    });
  });

  it('checkboxes reflect checked state from restrooms', () => {
    const setTotalRestrooms = jest.fn();
    render(<RestRoomsComp restrooms="1,3" setTotalRestrooms={setTotalRestrooms} />);

    expect(screen.getByRole('checkbox', { name: '1 өрөө' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('checkbox', { name: '2 өрөө' })).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByRole('checkbox', { name: '3 өрөө' })).toHaveAttribute('aria-checked', 'true');
  });

  it('toggles checkbox and calls setTotalRestrooms correctly', () => {
    const setTotalRestrooms = jest.fn();
    render(<RestRoomsComp restrooms="2" setTotalRestrooms={setTotalRestrooms} />);

    fireEvent.click(screen.getByRole('checkbox', { name: '1 өрөө' }));
    expect(setTotalRestrooms).toHaveBeenCalledWith('2,1');

    fireEvent.click(screen.getByRole('checkbox', { name: '2 өрөө' }));
    expect(setTotalRestrooms).toHaveBeenCalledWith('');
  });

  it('renders with undefined restrooms (fallback to empty array)', () => {
  const setTotalRestrooms = jest.fn();
  render(<RestRoomsComp restrooms={undefined as any} setTotalRestrooms={setTotalRestrooms} />);
  expect(screen.getByText('Ариун цэврийн өрөө')).toBeInTheDocument();
});

});
