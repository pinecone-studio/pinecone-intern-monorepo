import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilterByToday from '../../src/app/leaving/_components/FilterByToday';

describe('FilterByToday component', () => {
  it('calls handleTodayButtonClick when the button is clicked', () => {
    const handleTodayButtonClickMock = jest.fn();
    const { getByText } = render(<FilterByToday handleTodayButtonClick={handleTodayButtonClickMock} />);

    const button = getByText('Өнөөдөр');
    fireEvent.click(button);

    expect(handleTodayButtonClickMock).toHaveBeenCalled();
  });
});
