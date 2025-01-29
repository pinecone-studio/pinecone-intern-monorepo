import ComboBox from '@/components/detail/ComboBox';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Test', () => {
  it('render component', () => {
    const { getByTestId } = render(<ComboBox />);
    const box = getByTestId('Combo-box');

    expect(box).toBeInTheDocument();
  });
});
