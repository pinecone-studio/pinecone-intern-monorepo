import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Backbutton from '../../src/app/Lesson/component/BackButton'

describe('BackButton component', () => {
  it('calls handleBack function when clicked', () => {
    const mockPush = jest.fn();
    jest.mock('next/navigation', () => ({
      useRouter: () => ({
        push: mockPush
      })
    }));
    const { getByText } = render( <Backbutton />);

    fireEvent.click(getByText('Сэдвүүд'));

    expect(mockPush).toHaveBeenCalledWith('/dashboardOtherLab');
  });
});