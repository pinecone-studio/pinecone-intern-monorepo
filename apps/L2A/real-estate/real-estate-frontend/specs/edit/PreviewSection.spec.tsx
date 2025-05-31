import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PreviewSection from '@/app/user-listing/edit/_components/PreviewSection';

describe('PreviewSection', () => {
  it('renders buttons correctly', () => {
    render(<PreviewSection />);
    expect(screen.getByText('Зар оруулах хүсэлт илгээх')).toBeInTheDocument();
    expect(screen.getByText('Хадгалаад гарах')).toBeInTheDocument();
    expect(screen.getByText('Устгах')).toBeInTheDocument();
  });

  it('opens and closes save dialog', () => {
    render(<PreviewSection />);
    fireEvent.click(screen.getByTestId('open-save-dialog-button'));
    expect(screen.getByText('Хадгалах уу?')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Болих'));
    expect(screen.queryByText('Хадгалах уу?')).not.toBeInTheDocument();
  });

  it('opens and closes delete dialog', () => {
    render(<PreviewSection />);
    fireEvent.click(screen.getByTestId('open-delete-dialog-button'));
    expect(screen.getByText('Устгах уу?')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Болих'));
    expect(screen.queryByText('Устгах уу?')).not.toBeInTheDocument();
  });

  it('closes save dialog on confirm click', () => {
    render(<PreviewSection />);
    fireEvent.click(screen.getByTestId('open-save-dialog-button'));
    fireEvent.click(screen.getByTestId('confirm-save-button'));
    expect(screen.queryByText('Хадгалах уу?')).not.toBeInTheDocument();
  });

  it('closes delete dialog on confirm click', () => {
    render(<PreviewSection />);
    fireEvent.click(screen.getByTestId('open-delete-dialog-button'));
    fireEvent.click(screen.getByTestId('confirm-delete-button'));
    expect(screen.queryByText('Устгах уу?')).not.toBeInTheDocument();
  });
});
