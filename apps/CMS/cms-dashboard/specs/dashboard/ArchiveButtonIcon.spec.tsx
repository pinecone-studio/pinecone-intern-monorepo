import { act, fireEvent, render } from '@testing-library/react';
import { ArchiveButtonIcon } from '@/assets/icons';

describe('File upload', () => {
  it('1. Should render archive button', () => {
    const { getByTestId } = render(<ArchiveButtonIcon />);
    const buttonElement = getByTestId('archive-icon-test-id');

    act(() => {
      fireEvent.click(buttonElement);
    });
  });
});
