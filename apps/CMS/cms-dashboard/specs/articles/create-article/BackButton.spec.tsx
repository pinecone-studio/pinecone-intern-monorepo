import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import BackButton from '../../../src/app/articles/_components/create-article/BackButton';

describe('Create Article BackButton component', () => {
  it('1. Should render the correct props', () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(<BackButton onClick={mockFunction} />);
    const backButton = getByTestId('back-button');
    expect(backButton).toBeDefined();
  });

  it('2. Button clicked', () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(<BackButton onClick={mockFunction} />);
    const backButton = getByTestId('back-button');

    act(() => {
      fireEvent.click(backButton);
    });
  });
});
