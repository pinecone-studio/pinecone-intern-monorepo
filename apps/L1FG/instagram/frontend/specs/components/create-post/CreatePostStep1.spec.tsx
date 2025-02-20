import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreatePostStep1 from '@/components/create-post/CreatePostStep1';

describe('CreatePostStep1 Component', () => {
  const mockSetOpenCreatePostModal = jest.fn();

  const renderComponent = (openCreatePostModal: boolean) => {
    render(<CreatePostStep1 openCreatePostModal={openCreatePostModal} setOpenCreatePostModal={mockSetOpenCreatePostModal} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    global.alert = jest.fn();
  });

  it('should not render modal when openCreatePostModal is false', () => {
    renderComponent(false);
    expect(screen.queryByTestId('create-post-modal')).not.toBeInTheDocument();
  });

  it('should render modal when openCreatePostModal is true', () => {
    renderComponent(true);
    expect(screen.getByTestId('create-post-modal')).toBeInTheDocument();
  });

  it('should display modal header text correctly', () => {
    renderComponent(true);
    expect(screen.getByTestId('modal-header')).toHaveTextContent('Create new post');
  });

  it('should handle file input changes and update state', () => {
    renderComponent(true);

    const fileInput = screen.getByTestId('file-upload-input') as HTMLInputElement;
    const file = new File(['test image'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files).toHaveLength(1);
    expect(fileInput.files?.[0].name).toBe('test.png');
  });

  it('should handle successful file upload', async () => {
    /* eslint-disable camelcase */
    const mockResponse = { secure_url: 'https://example.com/image.jpg' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    renderComponent(true);

    const fileInput = screen.getByTestId('file-upload-input') as HTMLInputElement;
    const file = new File(['test image'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('should handle file upload failure', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, statusText: 'Upload Error' });

    renderComponent(true);

    const fileInput = screen.getByTestId('file-upload-input') as HTMLInputElement;
    const file = new File(['test image'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(global.alert);
    });
  });

  it('should trigger file input when "Select from computer" button is clicked', () => {
    renderComponent(true);

    const button = screen.getByTestId('select-from-computer-button');
    const fileInput = screen.getByTestId('file-upload-input');
    const clickSpy = jest.spyOn(fileInput, 'click');

    fireEvent.click(button);

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should display correct button text', () => {
    renderComponent(true);
    expect(screen.getByTestId('select-from-computer-button')).toHaveTextContent('Select from computer');
  });

  it('should return early if no files are uploaded', () => {
    renderComponent(true);

    const fileInput = screen.getByTestId('file-upload-input') as HTMLInputElement;

    fireEvent.change(fileInput, {
      target: { files: null },
    });

    expect(fileInput.files).toBe(null);
  });
});
