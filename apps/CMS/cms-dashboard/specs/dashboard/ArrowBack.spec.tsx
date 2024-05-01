import { render } from '@testing-library/react';
import { ArrowBack } from '../../src/app/articles/edit-article/[id]/_components/ArrowBack';

describe('Arrow back component', () => {
  it('1-> should verify if arrow back component is displayed or not', () => {
    const { container } = render(<ArrowBack />);
    expect(container).toBeDefined();
  });

  it('2 -> should check whether button exists or not', () => {
    const { getByTestId } = render(<ArrowBack />);
    const arrowButton = getByTestId('arrow-back-button-id');
    expect(arrowButton).toBeDefined();
  });
});
