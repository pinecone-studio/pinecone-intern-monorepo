import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { GuestsTable } from '../../../src/components/admin/GuestsTable';

describe('Admin Guests Table', () => {
  it('should render the admin guests table', () => {
    render(<GuestsTable />);
  });

  it('should handle pagination in guests table', async () => {
    render(<GuestsTable />);
    expect(screen.getByText('Page 1 of 5'));
    const nextButton = screen.getByTestId('jump-to-next');
    fireEvent.click(nextButton);
    expect(screen.getByText('Page 2 of 5'));
  });

  it('should navigate to the next and previous page using pagination controls', async () => {
    render(<GuestsTable />);

    const nextPageButton = screen.getByTestId('jump-to-next');
    fireEvent.click(nextPageButton);
    expect(screen.getByText('Page 2 of 5'));

    const previousPageButton = screen.getByTestId('jump-to-previous');
    fireEvent.click(previousPageButton);
    expect(screen.getByText('Page 1 of 5'));
  });

  it('should navigate to the first and last page using pagination controls', async () => {
    render(<GuestsTable />);

    const firstPageButton = screen.getByTestId('jump-to-start');
    fireEvent.click(firstPageButton);
    expect(screen.getByText('Page 1 of 5'));

    const lastPageButton = screen.getByTestId('jump-to-end');
    fireEvent.click(lastPageButton);
    expect(screen.getByText('Page 5 of 5'));
  });

  it('should not allow changing to a page less than 1', () => {
    render(<GuestsTable />);
    const prevButton = screen.getByTestId('jump-to-previous');
    fireEvent.click(prevButton);
    expect(screen.getByText(/Page 1 of 5/));
  });

  it('should not allow changing to a page greater than the total pages', () => {
    render(<GuestsTable />);
    const nextButton = screen.getByTestId('jump-to-next');
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(screen.getByText(/Page 5 of 5/));
  });
});
