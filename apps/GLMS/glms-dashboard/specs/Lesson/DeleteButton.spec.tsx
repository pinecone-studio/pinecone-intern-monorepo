import React from 'react';
import { render } from '@testing-library/react';
import DeleteButton from '../../src/app/Lesson/component/DeleteButton';

describe('DeleteButton component', () => {
  it('renders DeleteButton', () => {
    const { getByTestId } = render(<DeleteButton />);
    const backButton = getByTestId('delete-button-test-id');
  });
});
