import { act, fireEvent, render } from '@testing-library/react';
import { FileUploadIcon } from '../../src/assets/icons/FileUploadIcon';

describe('File upload', () => {
  it('1. Should render file upload component', () => {
    const { getByTestId } = render(<FileUploadIcon />);
    const buttonElement = getByTestId('file-upload-icon-id');

    act(() => {
      fireEvent.click(buttonElement);
    });
  });
});
