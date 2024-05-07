import { EditButtonIcon } from '../../src/assets/icons/EditButtonIcon';
import { act, fireEvent, render } from '@testing-library/react';

describe('Navbar test', () => {
  it('1. Should render navbar component', () => {
    const { getByTestId } = render(<EditButtonIcon />);
    const buttonElement = getByTestId('edit-button-test-id');

    act(() => {
      fireEvent.click(buttonElement);
    });
  });
});
