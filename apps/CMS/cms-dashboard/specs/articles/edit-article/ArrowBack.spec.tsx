import { act, fireEvent, render } from '@testing-library/react';
import { ArrowBack } from '../../../src/app/articles/edit-article/[id]/_components/ArrowBack';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

describe('Arrow back component', () => {
  it('2 -> should check whether button exists or not', () => {
    const { getByTestId } = render(<ArrowBack />);
    const arrowButton = getByTestId('arrow-back-button-id');

    act(() => {
      fireEvent.click(arrowButton);
    });
  });
});
