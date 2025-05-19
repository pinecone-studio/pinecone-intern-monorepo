import { CreatePostImages } from '@/app/create-post/_components/CreatePostImages';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'



global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ secure_url: 'https://fakeurl.com/image.jpg' }),
  })
) as jest.Mock;

describe('CreatePostImages', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with no images', () => {
    render(<CreatePostImages name="images" value={[]} onChange={mockOnChange} />);
    expect(screen.getByText('+ Зураг оруулах')).toBeInTheDocument();
  });

  it('displays error when passed', () => {
    render(<CreatePostImages name="images" value={[]} onChange={mockOnChange} error="Image is required" />);
    expect(screen.getByText('Image is required')).toBeInTheDocument();
  });

  it('calls input click when upload button is clicked', () => {
    render(<CreatePostImages name="images" value={[]} onChange={mockOnChange} />);
    const button = screen.getByTestId('upload-button');
    const input = screen.getByTestId('images');

    const inputClickSpy = jest.spyOn(input, 'click');
    fireEvent.click(button);
    expect(inputClickSpy).toHaveBeenCalled();
  });

  it('uploads image and calls onChange with new URL', async () => {
    render(<CreatePostImages name="images" value={[]} onChange={mockOnChange} />);

    const input = screen.getByTestId('images') as HTMLInputElement;

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    fireEvent.change(input, {
      target: { files: [file] },
    });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(['https://fakeurl.com/image.jpg']);
    });
  });

  it('renders uploaded image and can remove it', () => {
    const { getByAltText, getByText } = render(<CreatePostImages name="images" value={['https://image.jpg']} onChange={mockOnChange} />);

    expect(getByAltText('preview')).toHaveAttribute('src', 'https://image.jpg');

    fireEvent.click(getByText('×'));
    expect(mockOnChange).toHaveBeenCalledWith([]);
  });
});
