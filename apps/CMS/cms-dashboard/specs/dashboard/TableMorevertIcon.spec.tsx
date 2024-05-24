import { act, fireEvent, render } from '@testing-library/react';
import { MorevertButtonIcon } from '@/assets/icons';

describe('Dashboard table morevert button', () => {
  it('1. Should render archive button', () => {
    const { getByTestId } = render(<MorevertButtonIcon />);
    const buttonElement = getByTestId('table-morevert-test-id');

    act(() => {
      fireEvent.click(buttonElement);
    });
  });
});
