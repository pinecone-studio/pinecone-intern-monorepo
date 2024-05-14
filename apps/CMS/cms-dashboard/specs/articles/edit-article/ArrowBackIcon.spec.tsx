import { ArrowBackIcon } from '@/icons';
import { act, fireEvent, render } from '@testing-library/react';

describe('Arrow back', () => {
  it('1. Should render arrow back icon', () => {
    const { getByTestId } = render(<ArrowBackIcon />);
    const buttonElement = getByTestId('arrow-back-icon-id');

    act(() => {
      fireEvent.click(buttonElement);
    });
  });
});
