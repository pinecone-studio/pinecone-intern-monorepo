import { render, screen, fireEvent } from '@testing-library/react';
import PreviewSection from '@/app/user-listing/edit/_components/PreviewSection';
import '@testing-library/jest-dom';

describe('PreviewSection', () => {
  it('renders preview section correctly', () => {
    render(<PreviewSection />);

expect(screen.getByRole('heading', { name: /Хэрэглэгчдэд харагдах/i })).toBeInTheDocument();
expect(screen.getByText(/Таны оруулсан мэдээлэл хэрэглэгчдэд/i)).toBeInTheDocument();

    expect(screen.getByTestId('listing-preview-card')).toBeInTheDocument();
    expect(screen.getByTestId('submit-post-button')).toBeInTheDocument();
    expect(screen.getByTestId('save-post-button')).toBeInTheDocument();
    expect(screen.getByTestId('delete-post-button')).toBeInTheDocument();
  });

  it('opens delete confirmation dialog when clicking delete', () => {
    render(<PreviewSection />);

    fireEvent.click(screen.getByTestId('delete-post-button'));

    expect(screen.getByTestId('delete-confirm-modal')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-delete-button')).toBeInTheDocument();
    expect(screen.getByTestId('cancel-delete-button')).toBeInTheDocument();
    expect(screen.getByText(/Та устгахдаа итгэлтэй байна уу/i)).toBeInTheDocument();
  });

  it('closes delete dialog when clicking cancel', () => {
    render(<PreviewSection />);

    fireEvent.click(screen.getByTestId('delete-post-button'));
    fireEvent.click(screen.getByTestId('cancel-delete-button'));
    expect(screen.queryByTestId('delete-confirm-modal')).not.toBeInTheDocument();
  });

  it('closes delete dialog when clicking confirm delete', () => {
    render(<PreviewSection />);

    fireEvent.click(screen.getByTestId('delete-post-button'));
    fireEvent.click(screen.getByTestId('confirm-delete-button'));
    expect(screen.queryByTestId('delete-confirm-modal')).not.toBeInTheDocument();
  });
});

