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
  it('should render the admin image dialog and handle "View more" click', () => {
    const mockSetDialogOpen = jest.fn();

    render(
      <ImageDialog
        dialogOpen={true}
        setDialogOpen={mockSetDialogOpen}
        images={[
          'https://example.com/image1.jpg',
          'https://example.com/image2.jpg',
          'https://example.com/image3.jpg',
          'https://example.com/image4.jpg',
          'https://example.com/image5.jpg',
          'https://example.com/image6.jpg',
          'https://example.com/image7.jpg',
        ]}
      />
    );

    const images = screen.getAllByRole('img');
    expect(images.length).toBe(6);

    const viewMoreButton = screen.getByTestId('view-more');
    expect(viewMoreButton).toBeInTheDocument();

    fireEvent.click(viewMoreButton);
  });
});
