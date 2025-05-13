import ImageUploadPage from '@/app/auth/create-account/_components/ImageUploadPage'; // path-аа зөв тохируул
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('ImageUploadPage', () => {
  const mockSetStep = jest.fn();

  beforeEach(() => {
    mockSetStep.mockClear();
    global.URL.createObjectURL = jest.fn(() => 'mock-url'); // File preview-ийг mock хийх
  });

  it('renders title and buttons correctly', () => {
    render(<ImageUploadPage setStep={mockSetStep} />);
    expect(screen.getByText('Upload your image')).toBeInTheDocument();
    expect(screen.getByText('Upload image')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('shows error if no images uploaded and Next is clicked', () => {
    render(<ImageUploadPage setStep={mockSetStep} />);
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Please select a photo to upload.')).toBeInTheDocument();
  });

  it('shows error if less than 3 images uploaded', () => {
    render(<ImageUploadPage setStep={mockSetStep} />);

    const input = screen.getByLabelText(/upload image/i);
    const files = [
      new File(['img1'], 'img1.png', { type: 'image/png' }),
      new File(['img2'], 'img2.png', { type: 'image/png' }),
    ];

    fireEvent.change(input, { target: { files } });
    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText('Please upload at least 3 photos to continue.')).toBeInTheDocument();
  });

  it('allows proceeding when 3 or more images are uploaded', () => {
    render(<ImageUploadPage setStep={mockSetStep} />);

    const input = screen.getByLabelText(/upload image/i);
    const files = [
      new File(['img1'], 'img1.png', { type: 'image/png' }),
      new File(['img2'], 'img2.png', { type: 'image/png' }),
      new File(['img3'], 'img3.png', { type: 'image/png' }),
      new File(['img3'], 'img4.png', { type: 'image/png' }),
    ];

    fireEvent.change(input, { target: { files } });
    fireEvent.click(screen.getByText('Next'));

    expect(mockSetStep).toHaveBeenCalledWith(4);
  });

  it('removes image when remove button is clicked', () => {
    render(<ImageUploadPage setStep={mockSetStep} />);

    const input = screen.getByLabelText(/upload image/i);
    const files = [
      new File(['img1'], 'img1.png', { type: 'image/png' }),
      new File(['img2'], 'img2.png', { type: 'image/png' }),
      new File(['img3'], 'img3.png', { type: 'image/png' }),
    ];

    fireEvent.change(input, { target: { files } });

    const removeButtons = screen.getAllByRole('button').filter(btn => btn.innerHTML.includes('svg'));
    fireEvent.click(removeButtons[0]);

    const images = screen.getAllByAltText(/Uploaded image/);
    expect(images.length).toBe(2); // 1-ийг устгасан
  });

  it('shows "Please select a photo to upload." when no image is selected', () => {
    render(<ImageUploadPage setStep={mockSetStep} />);
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Please select a photo to upload.')).toBeInTheDocument();
  });

  it('does nothing when no file is uploaded (handleImageUpload empty)', () => {
    render(<ImageUploadPage setStep={mockSetStep} />);
    const input = screen.getByLabelText(/upload image/i);
    fireEvent.change(input, { target: { files: [] } }); // files.length = 0
    expect(screen.queryByAltText(/Uploaded image/)).not.toBeInTheDocument();
  });

  it('calls setStep(4) when at least 4 images are uploaded', () => {
    render(<ImageUploadPage setStep={mockSetStep} />);
  
    const input = screen.getByLabelText(/upload image/i);
    const files = [
      new File(['img1'], 'img1.png', { type: 'image/png' }),
      new File(['img2'], 'img2.png', { type: 'image/png' }),
      new File(['img3'], 'img3.png', { type: 'image/png' }),
      new File(['img4'], 'img4.png', { type: 'image/png' }),
    ];
  
    fireEvent.change(input, { target: { files } });
    fireEvent.click(screen.getByText('Next'));
  
    expect(mockSetStep).toHaveBeenCalledWith(4);
  });
});