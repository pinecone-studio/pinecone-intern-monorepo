import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import '@testing-library/jest-dom';
import ImagesSection from '@/components/addEstate/ImagesSection';

global.URL.createObjectURL = jest.fn(() => 'mocked-url');

const FormProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: {
      images: [],
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('ImagesSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders upload section', () => {
    render(
      <FormProviderWrapper>
        <ImagesSection />
      </FormProviderWrapper>
    );

    expect(screen.getByText('Энд дарж зураг сонгоно уу')).toBeInTheDocument();
    const input = screen.getByTestId('upload-image');
    expect(input).toHaveAttribute('type', 'file');
  });

  it('handles file upload', async () => {
    render(
      <FormProviderWrapper>
        <ImagesSection />
      </FormProviderWrapper>
    );

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    const input = screen.getByTestId('upload-image') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByAltText('Preview 1')).toBeInTheDocument();
    });
  });

  it('removes uploaded image', async () => {
    render(
      <FormProviderWrapper>
        <ImagesSection />
      </FormProviderWrapper>
    );

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    const input = screen.getByTestId('upload-image') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByAltText('Preview 1')).toBeInTheDocument();
    });

    const removeButton = screen.getByText('X');
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(screen.queryByAltText('Preview 1')).not.toBeInTheDocument();
    });
  });

  it('handles empty file list', async () => {
    render(
      <FormProviderWrapper>
        <ImagesSection />
      </FormProviderWrapper>
    );

    const input = screen.getByTestId('upload-image') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [] } });

    await waitFor(() => {
      expect(screen.queryByAltText('Preview 1')).not.toBeInTheDocument();
    });
  });

  it('handles error during file upload', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const mockSetValue = jest.fn().mockImplementation(() => {
      throw new Error('Mocked error');
    });

    jest.spyOn(require('react-hook-form'), 'useFormContext').mockImplementation(() => ({
      control: {},
      watch: () => [],
      setValue: mockSetValue,
    }));

    render(
      <FormProviderWrapper>
        <ImagesSection />
      </FormProviderWrapper>
    );

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    const input = screen.getByTestId('upload-image') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error handling images:', expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it('handles empty watchedImages', async () => {
    render(
      <FormProviderWrapper>
        <ImagesSection />
      </FormProviderWrapper>
    );

    await waitFor(() => {
      expect(screen.queryByAltText('Preview 1')).not.toBeInTheDocument();
    });
  });
});
