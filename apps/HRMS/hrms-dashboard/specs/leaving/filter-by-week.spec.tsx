import { render, fireEvent } from '@testing-library/react';
import FilterByWeek from '../../src/app/leaving/_components/FilterByWeek';

describe('FilterByWeek component', () => {
  it('should call onClick function when button is clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<FilterByWeek onClick={onClickMock} />);
    const button = getByText('7 Хоног');
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
