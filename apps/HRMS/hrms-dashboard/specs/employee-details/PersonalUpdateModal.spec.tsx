import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PersonalUpdateModal from '../../src/app/employee-details/update/[id]/_features/PersonalUpdateModal';

describe('PersonalUpdateModal', () => {
  const props = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    jobTitle: 'Software Engineer',
    homeAddress: '123 Main St, City',
    imageUrl: 'https://example.com/image.jpg',
    setIsModalOpen: jest.fn(),
  };

  it('should call setIsModalOpen with false when cancel button is clicked', () => {
    const { getByTestId } = render(<PersonalUpdateModal {...props} />);
    const cancelButton = getByTestId('personal-info-cancel');
    fireEvent.click(cancelButton);
    expect(props.setIsModalOpen).toHaveBeenCalledWith(false);
  });

  it('should call setIsModalOpen with false when close button is clicked', () => {
    const { getByTestId } = render(<PersonalUpdateModal {...props} />);
    const closeButton = getByTestId('modal-close-icon');
    fireEvent.click(closeButton);
    expect(props.setIsModalOpen).toHaveBeenCalledWith(false);
  });
});
