import { render, fireEvent } from '@testing-library/react';
import FilterByToday from '../../src/app/leaving/_components/FilterByToday';

describe('FilterByToday component', () => {
  it('should call onClick function when button is clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<FilterByToday onClick={onClickMock} />);
    const button = getByText('Өнөөдөр');
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
