import { DropDownIcon } from '@/icons';
import { act, fireEvent, render } from '@testing-library/react';

describe('Drop down icon', () => {
  it('1. Should render drop down icon', () => {
    const { getByTestId } = render(<DropDownIcon />);
    const buttonElement = getByTestId('drow-down-icon-id');

    act(() => {
      fireEvent.click(buttonElement);
    });
  });
});
