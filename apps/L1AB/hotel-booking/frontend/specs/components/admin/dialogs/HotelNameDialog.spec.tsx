import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { HotelNameDialog } from '@/components/admin/dialogs';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DialogTrigger: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DialogContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DialogHeader: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DialogTitle: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
  DialogDescription: ({ children }: { children: ReactNode }) => <p>{children}</p>,
  DialogFooter: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DialogClose: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));
describe('Admin Hotel Name Dialog', () => {
  it('should update the hotel name input value', () => {
    render(<HotelNameDialog />);

    const openDialogButton = screen.getByText(/Add Hotel/i);
    fireEvent.click(openDialogButton);

    const input = screen.getByPlaceholderText(/Hotel Name/i);
    fireEvent.change(input, { target: { value: 'New Hotel' } });

    expect(input.value).toBe('New Hotel');
  });
  it('should handle the "Next" button click with a valid hotel name', async () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ push });

    render(<HotelNameDialog />);

    const openDialogButton = screen.getByText(/Add Hotel/i);
    fireEvent.click(openDialogButton);

    const input = screen.getByPlaceholderText(/Hotel Name/i);
    fireEvent.change(input, { target: { value: 'New Hotel' } });

    const addHotel = screen.getByTestId('add-hotel');
    fireEvent.click(addHotel);

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/admin/hotels/New Hotel');
    });
  });
  it('should not navigate when the hotel name is empty', async () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ push });

    render(<HotelNameDialog />);

    const openDialogButton = screen.getByText(/Add Hotel/i);
    fireEvent.click(openDialogButton);

    const nextButton = screen.getByTestId('add-hotel');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(push).not.toHaveBeenCalled();
    });
  });
});
