import { CreatePostImages } from '@/app/create-post/_components/CreatePostImages';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('CreatePostImages component', () => {
  const defaultProps = {
    name: 'images',
    value: [],
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<CreatePostImages {...defaultProps} />);
    expect(screen.getByTestId('images')).toBeInTheDocument();
  });

  it('calls inputRef click when upload button is clicked', () => {
    render(<CreatePostImages {...defaultProps} />);

    const input = screen.getByTestId('image-input');
    const clickSpy = jest.spyOn(input, 'click');

    const uploadButton = screen.getByTestId('upload-button');
    fireEvent.click(uploadButton);

    expect(clickSpy).toHaveBeenCalled();
  });
  
  it('renders image previews when value is passed', () => {
    const urls = ['img1.jpg', 'img2.jpg'];
    render(<CreatePostImages {...defaultProps} value={urls} />);

    const images = screen.getAllByAltText('preview');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'img1.jpg');
    expect(images[1]).toHaveAttribute('src', 'img2.jpg');
  });

  it('removes image when remove button is clicked', () => {
    const urls = ['img1.jpg', 'img2.jpg'];
    const onChange = jest.fn();

    render(<CreatePostImages {...defaultProps} value={urls} onChange={onChange} />);
    const removeButtons = screen.getAllByRole('button', { name: '×' });

    fireEvent.click(removeButtons[0]);
    expect(onChange).toHaveBeenCalledWith(['img2.jpg']);
  });

  it('shows error message when error prop is passed', () => {
    render(<CreatePostImages {...defaultProps} error="Алдаа гарлаа" />);
    expect(screen.getByText('Алдаа гарлаа')).toBeInTheDocument();
  });

  it('uploads image and calls onChange with secure_url', async () => {
    const mockSecureUrl = 'https://cloudinary.com/test-image.jpg';
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ secureUrl: mockSecureUrl }), 
    }) as any;
  
    const onChange = jest.fn();
    render(<CreatePostImages {...defaultProps} onChange={onChange} />);
  
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByTestId('image-input');
    fireEvent.change(input, { target: { files: [file] } });
  
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([mockSecureUrl]);
    });
  });

  it('does not call onChange if no files are selected', () => {
    const onChange = jest.fn();
    render(<CreatePostImages {...defaultProps} onChange={onChange} />);

    const input = screen.getByTestId('image-input');

    fireEvent.change(input, { target: { files: null } });

    expect(onChange).not.toHaveBeenCalled();
  });
});
