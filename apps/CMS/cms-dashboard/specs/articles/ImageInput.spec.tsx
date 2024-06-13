import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ImageInput } from '@/app/articles/_components/index';

describe('ImageInput Component', () => {
  it('should trigger image upload window on parent div click and preview the image', async () => {
    const mockOnImageUpload = jest.fn();
    render(<ImageInput onImageUpload={mockOnImageUpload} />);

    const inputElement = screen.getByLabelText(/Өнгөц зураг/i).nextSibling as HTMLInputElement;
    const parentDiv = inputElement.parentElement;

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    fireEvent.click(parentDiv!);
    fireEvent.change(inputElement, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockOnImageUpload).toHaveBeenCalledWith(file);
    });

    await waitFor(() => {
      const previewImage = screen.getByAltText('uploaded img');
      expect(previewImage).toBeInTheDocument();
      expect(previewImage).toHaveAttribute('src', expect.stringContaining('data:image/png;base64,'));
    });

    const newFile = new File(['world'], 'world.png', { type: 'image/png' });
    fireEvent.change(inputElement, { target: { files: [newFile] } });

    await waitFor(() => {
      expect(mockOnImageUpload).toHaveBeenCalledWith(newFile);
    });

    await waitFor(() => {
      const previewImage = screen.getByAltText('uploaded img');
      expect(previewImage).toBeInTheDocument();
      expect(previewImage).toHaveAttribute('src', expect.stringContaining('data:image/png;base64,'));
    });
  });
});
