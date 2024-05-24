import { act, fireEvent, render } from '@testing-library/react';
import { LinkButtonIcon } from '@/assets/icons';

describe('File upload', () => {
  it('1. Should render archive button', () => {
    const { getByTestId } = render(<LinkButtonIcon />);
    const buttonElement = getByTestId('link-icon-test-id');

    act(() => {
      fireEvent.click(buttonElement);
    });
  });
});
