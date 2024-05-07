import React from 'react';
import { render } from '@testing-library/react';
import EditButton from '../../src/app/[id]/_components/Editbutton';
import EditBigButton from '../../src/app/[id]/_components/EditBigButton';

describe('EditButton component', () => {
  it('renders EditButton', () => {
    const { getByTestId } = render(<EditButton />);
    const editButton = getByTestId('edit-button-test-id');
    expect(editButton).toBeDefined();
  });

  it('renders EditBigButton', () => {
    const { getByTestId } = render(<EditBigButton />);
    const editButton = getByTestId('edit-button-test-id');
    expect(editButton).toBeDefined();
  });
  it('renders correct text in EditButton', () => {
    const { getByText } = render(<EditBigButton />);
    const buttonText = getByText('Ерөнхийн мэдээлэл');
    expect(buttonText).toBeDefined();
  });
});
