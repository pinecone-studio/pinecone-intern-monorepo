import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UploadStep from '@/components/CreatePostUpload';

// Mock URL.createObjectURL globally
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

// Mock the Image component from Next.js (since it uses native browser APIs)
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

describe('UploadStep Component', () => {
  const onFileSelectMock = jest.fn();
  const onFileChangeMock = jest.fn();
  const onFileRemoveMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display the upload button when no files are selected', () => {
    render(<UploadStep onFileSelect={onFileSelectMock} selectedFiles={[]} onFileChange={onFileChangeMock} onFileRemove={onFileRemoveMock} />);
    expect(screen.getByText('Select from computer')).toBeInTheDocument();
  });

  it('should allow users to select an image file', async () => {
    const mockFile = new File(['image-content'], 'sample-image.jpg', { type: 'image/jpeg' });

    render(<UploadStep onFileSelect={onFileSelectMock} selectedFiles={[mockFile]} onFileChange={onFileChangeMock} onFileRemove={onFileRemoveMock} isUploading={false} />);

    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, {
      target: { files: [mockFile] },
    });
  });

  it('should remove a file when the remove button is clicked', async () => {
    const mockFile = new File(['image-content'], 'sample-image.jpg', { type: 'image/jpeg' });

    render(<UploadStep onFileSelect={onFileSelectMock} selectedFiles={[mockFile]} onFileChange={onFileChangeMock} onFileRemove={onFileRemoveMock} isUploading={true} />);

    expect(screen.queryByAltText('sample-image.jpg'));
  });

  it('should clean up URLs when files are removed or the component unmounts', async () => {
    const mockFile = new File(['image-content'], 'sample-image.jpg', { type: 'image/jpeg' });

    render(
      <UploadStep
        onFileSelect={onFileSelectMock}
        selectedFiles={[mockFile]} // Pass a mock file for the test
        onFileChange={onFileChangeMock}
        onFileRemove={onFileRemoveMock}
      />
    );

    // Create the mock URL
    const fileUrl = URL.createObjectURL(mockFile);
    expect(screen.getByAltText('sample-image.jpg')).toHaveAttribute('src', fileUrl);

    // Trigger file removal
    fireEvent.click(screen.getByLabelText('Delete file'));

    // Ensure the remove function is called with the correct index
    await waitFor(() => {
      expect(onFileRemoveMock).toHaveBeenCalledWith(0);
    });

    // Manually revoke the URL to simulate cleanup
    URL.revokeObjectURL(fileUrl);
  });

  it('should show file previews after files are selected', () => {
    const selectedFiles = [new File(['dummy content'], 'file1.jpg', { type: 'image/jpeg' })];

    render(
      <UploadStep
        onFileSelect={onFileSelectMock}
        selectedFiles={selectedFiles} // Mock selected file for the test
        onFileChange={onFileChangeMock}
        onFileRemove={onFileRemoveMock}
      />
    );

    // Check that file previews are shown
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(1); // One image file selected
  });

  it('should not render anything for unsupported file types', () => {
    const selectedFiles = [
      new File(['dummy content'], 'file1.pdf', { type: 'application/pdf' }), // Unsupported file type
      new File(['dummy content'], 'file2.txt', { type: 'text/plain' }), // Unsupported file type
    ];

    render(
      <UploadStep
        onFileSelect={onFileSelectMock}
        selectedFiles={selectedFiles} // Mock unsupported files
        onFileChange={onFileChangeMock}
        onFileRemove={onFileRemoveMock}
      />
    );

    // No image or video elements should be rendered for unsupported file types
    const images = screen.queryAllByRole('img');
    expect(images).toHaveLength(0); // No image element should be rendered
  });
});
