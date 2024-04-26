import React from 'react';
import { render } from '@testing-library/react';
import EditButton from '../../src/app/Lesson/component/EditButton';

describe('EditButton component', () => {
  it('renders EditButton', () => {
    const { getByTestId } = render(<EditButton />);
    const EditButton = getByTestId('edit-button-test-id');
  });
  it('renders correct text in EditButton', () => {
    const { getByText } = render(<EditButton />);
    const buttonText = getByText('Ерөнхийн мэдээлэл');
  });
});
