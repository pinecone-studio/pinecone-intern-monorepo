import React from 'react';
import { render } from '@testing-library/react';
import ModalLogo from '../../../src/app/articles/_components/create-article/ModalLogo';

describe('Create Article ModalLogo component', () => {
  it('1. Should render the correct props', () => {
    const { getByTestId } = render(<ModalLogo />);
    const modalLogo = getByTestId('modal-logo');
    expect(modalLogo).toBeDefined();
  });
});
