import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateStoryStep1 from '@/components/story/createStory/CreateStoryStep1';

describe('CreateStoryStep1 Component', () => {
  const mockSetOpenCreateStoryModal = jest.fn();

  const renderComponent = (openCreateStoryModal: boolean) => {
    render(<CreateStoryStep1 openCreateStoryModal={openCreateStoryModal} setOpenCreateStoryModal={mockSetOpenCreateStoryModal} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    global.alert = jest.fn();
  });

  it('should not render modal when openCreateStoryModal is false', () => {
    renderComponent(false);
    expect(screen.queryByTestId('create-post-modal-story')).not.toBeInTheDocument();
  });

  it('should render modal when openCreateStoryModal is true', () => {
    renderComponent(true);
    expect(screen.getByTestId('create-post-modal-story')).toBeInTheDocument();
  });

  it('should display modal header text correctly', () => {
    renderComponent(true);
    expect(screen.getByTestId('modal-header-story')).toHaveTextContent('Add story');
  });

  it('should handle file input changes and update state', () => {
    renderComponent(true);

    const fileInput = screen.getByTestId('file-upload-input-story') as HTMLInputElement;
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

    const fileInput = screen.getByTestId('file-upload-input-story') as HTMLInputElement;
    const file = new File(['test image'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('should handle file upload failure', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, statusText: 'Upload Error' });

    renderComponent(true);

    const fileInput = screen.getByTestId('file-upload-input-story') as HTMLInputElement;
    const file = new File(['test image'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(global.alert);
    });
  });

  // it('should display loading overlay during file upload', async () => {
  //   jest.spyOn(React, 'useState').mockImplementationOnce(() => [true, jest.fn()]);

  //   renderComponent(true);

  //   expect(screen.getByTestId('loading-overlay')).toBeInTheDocument();
  // });

  it('should trigger file input when "Select from computer" button is clicked', () => {
    renderComponent(true);

    const button = screen.getByTestId('select-from-computer-button-story');
    const fileInput = screen.getByTestId('file-upload-input-story');
    const clickSpy = jest.spyOn(fileInput, 'click');

    fireEvent.click(button);

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should display correct button text', () => {
    renderComponent(true);
    expect(screen.getByTestId('select-from-computer-button-story')).toHaveTextContent('Select from computer');
  });

  it('should return early if no files are uploaded', () => {
    renderComponent(true);

    const fileInput = screen.getByTestId('file-upload-input-story') as HTMLInputElement;

    // Файл оруулаагүй байх нөхцөл үүсгэнэ
    fireEvent.change(fileInput, {
      target: { files: null },
    });

    // Файл оруулаагүй тул input дээр ямар нэг өөрчлөлт хийх ёсгүй
    expect(fileInput.files).toBe(null);
  });
});
