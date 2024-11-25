import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { ImageDialog } from '@/components/main/assets';
import { ReactNode } from 'react';

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

describe('Admin images dialog', () => {
  it('should render the admin image dialog', () => {
    render(<ImageDialog />);

    const viewMoreButton = screen.getByTestId('view-more');
    fireEvent.click(viewMoreButton);
  });
});
