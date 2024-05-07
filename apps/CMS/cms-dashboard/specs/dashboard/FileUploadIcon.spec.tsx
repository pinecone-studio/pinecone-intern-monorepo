import { act, fireEvent, render } from '@testing-library/react';
import { FileUploadIcon } from '../../src/assets/icons/FileUploadIcon';

describe('Navbar test', () => {
  it('1. Should render navbar component', () => {
    const { getByTestId } = render(<FileUploadIcon />);
    const buttonElement = getByTestId('file-upload-icon-id');

    act(() => {
      fireEvent.click(buttonElement);
    });
  });
});
