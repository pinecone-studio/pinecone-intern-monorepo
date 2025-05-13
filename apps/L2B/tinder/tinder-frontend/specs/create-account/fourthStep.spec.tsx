import FourthStep from '@/app/auth/create-account/_components/FourthStep';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('FourthStep', () => {
  it('should show error when no image is uploaded', () => {
    render(<FourthStep setStep={mockSetStep} />);
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Please upload at least 3 photos to continue.')).toBeInTheDocument();
    expect(mockSetStep).not.toHaveBeenCalled();
  });

  it('should show error when less than 3 images are uploaded', () => {
    render(<FourthStep setStep={mockSetStep} />);

    const fileInput = screen.getByLabelText(/upload image/i) as HTMLInputElement;

    const files = [new File(['dummy'], 'photo1.png', { type: 'image/png' }), new File(['dummy'], 'photo2.png', { type: 'image/png' })];

    fireEvent.change(fileInput, { target: { files } });
    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText('Please upload at least 3 photos to continue.')).toBeInTheDocument();
    expect(mockSetStep).not.toHaveBeenCalled();
  });

  it('should call setStep when 3 or more images are uploaded', () => {
    render(<FourthStep setStep={mockSetStep} />);

    const fileInput = screen.getByLabelText(/upload image/i) as HTMLInputElement;

    const files = [new File(['dummy'], 'photo1.png', { type: 'image/png' }), new File(['dummy'], 'photo2.png', { type: 'image/png' }), new File(['dummy'], 'photo3.png', { type: 'image/png' })];

    fireEvent.change(fileInput, { target: { files } });
    fireEvent.click(screen.getByText('Next'));

    expect(mockSetStep).toHaveBeenCalledWith(4);
  });

  it('should remove an image when remove button is clicked', () => {
    render(<FourthStep setStep={mockSetStep} />);

    const fileInput = screen.getByLabelText(/upload image/i) as HTMLInputElement;

    const files = [new File(['dummy'], 'photo1.png', { type: 'image/png' }), new File(['dummy'], 'photo2.png', { type: 'image/png' }), new File(['dummy'], 'photo3.png', { type: 'image/png' })];

    fireEvent.change(fileInput, { target: { files } });

    // Устгах товчийг олж дарна
    const removeButtons = screen.getAllByRole('button');
    const removeButton = removeButtons.find((btn) => btn.innerHTML.includes('svg'));
    fireEvent.click(removeButton!);

    // Хүлээгдэж буй үр дүн
    expect(screen.queryAllByAltText(/Uploaded image/i).length).toBe(2);
  });
});
