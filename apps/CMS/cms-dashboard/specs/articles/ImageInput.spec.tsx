import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ImageInput } from '@/app/articles/_components';

describe('ImageInput Component', () => {
  it('should render correctly without initial image', () => {
    const mockOnImageUpload = jest.fn();
    render(<ImageInput onImageUpload={mockOnImageUpload} />);

    expect(screen.getByText(/Өнгөц зураг/i)).toBeInTheDocument();

    expect(screen.getByText(/Зураг оруулах/i)).toBeInTheDocument();
    expect(screen.getByText(/Хэмжээ: 928x427/i)).toBeInTheDocument();
  });

  it('should trigger image upload window on parent div click', () => {
    const mockOnImageUpload = jest.fn();
    render(<ImageInput onImageUpload={mockOnImageUpload} />);

    const fileInput = screen.getByLabelText(/Өнгөц зураг/i).nextSibling as HTMLInputElement;
    const parentDiv = fileInput.parentElement;

    const fileInputClickSpy = jest.spyOn(fileInput, 'click');

    fireEvent.click(parentDiv!);

    expect(fileInputClickSpy).toHaveBeenCalled();
  });

  it('should update preview image when a file is selected', async () => {
    const mockOnImageUpload = jest.fn();
    render(<ImageInput onImageUpload={mockOnImageUpload} />);

    const fileInput = screen.getByLabelText(/Өнгөц зураг/i).nextSibling as HTMLInputElement;
    const parentDiv = fileInput.parentElement;

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    fireEvent.click(parentDiv!);

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      const previewImage = screen.getByAltText('uploaded img');
      expect(previewImage).toBeInTheDocument();
      expect(previewImage).toHaveAttribute('src', expect.stringContaining('data:image/png;base64,'));
    });
  });

  it('should call onImageUpload when a file is selected', async () => {
    const mockOnImageUpload = jest.fn();
    render(<ImageInput onImageUpload={mockOnImageUpload} />);

    const fileInput = screen.getByLabelText(/Өнгөц зураг/i).nextSibling as HTMLInputElement;
    const parentDiv = fileInput.parentElement;

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    fireEvent.click(parentDiv!);

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockOnImageUpload).toHaveBeenCalledWith(file);
    });
  });

  it('should allow changing the uploaded image', async () => {
    const mockOnImageUpload = jest.fn();
    render(<ImageInput onImageUpload={mockOnImageUpload} />);

    const fileInput = screen.getByLabelText(/Өнгөц зураг/i).nextSibling as HTMLInputElement;
    const parentDiv = fileInput.parentElement;

    const file1 = new File(['hello'], 'hello.png', { type: 'image/png' });

    fireEvent.click(parentDiv!);

    fireEvent.change(fileInput, { target: { files: [file1] } });

    await waitFor(() => {
      const previewImage = screen.getByAltText('uploaded img');
      expect(previewImage).toBeInTheDocument();
      expect(previewImage).toHaveAttribute('src', expect.stringContaining('data:image/png;base64,'));
    });

    const file2 = new File(['world'], 'world.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file2] } });

    await waitFor(() => {
      const previewImage = screen.getByAltText('uploaded img');
      expect(previewImage).toBeInTheDocument();
      expect(previewImage).toHaveAttribute('src', expect.stringContaining('data:image/png;base64,'));
    });
  });

  it('should not call onImageUpload if no file is selected', async () => {
    const mockOnImageUpload = jest.fn();
    render(<ImageInput onImageUpload={mockOnImageUpload} />);

    const fileInput = screen.getByLabelText(/Өнгөц зураг/i).nextSibling as HTMLInputElement;
    const parentDiv = fileInput.parentElement;

    fireEvent.click(parentDiv!);

    fireEvent.change(fileInput, { target: { files: [] } });

    await waitFor(() => {
      expect(mockOnImageUpload).not.toHaveBeenCalled();
    });
  });

  it('should not open file picker again when clicking inside file input', async () => {
    const mockOnImageUpload = jest.fn();
    render(<ImageInput onImageUpload={mockOnImageUpload} />);

    const fileInput = screen.getByLabelText(/Өнгөц зураг/i).nextSibling as HTMLInputElement;
    const parentDiv = fileInput.parentElement;

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    fireEvent.click(parentDiv!);

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      const previewImage = screen.getByAltText('uploaded img');
      expect(previewImage).toBeInTheDocument();
      expect(previewImage).toHaveAttribute('src', expect.stringContaining('data:image/png;base64,'));
    });

    fireEvent.click(fileInput);

    await waitFor(() => {
      expect(mockOnImageUpload).toHaveBeenCalledTimes(1);
    });
  });
});
