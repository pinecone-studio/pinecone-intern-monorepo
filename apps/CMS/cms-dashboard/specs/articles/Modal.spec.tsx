import Modal from '@/app/articles/_components/Modal';
import { act, fireEvent, render } from '@testing-library/react';

describe('modal', () => {
  it('should act', () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(<Modal onClose={mockFunction} isVisible={true} />);
    const btn = getByTestId('modalBtn');
    act(() => {
      fireEvent.click(btn);
    });
    const closeBtn = getByTestId('modalCloseBtn');
    act(() => {
      fireEvent.click(closeBtn);
    });
  });
});
