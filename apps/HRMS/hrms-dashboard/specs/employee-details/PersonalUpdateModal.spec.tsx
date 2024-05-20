import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PersonalUpdateModal from '../../src/app/employee-details/_features/PersonalUpdateModal';

describe('PersonalInformation', () => {
  const props = {
    lastName: 'М.Ганбат',
    email: 'ganaa0526@gmail.com',
    phone:"99112233"
  };
  it('should render PersonalInformation component', () => {
    const { container } = render(<PersonalUpdateModal email={props.email} lastName={props.lastName} setIsModalOpen={() => {}} />);
    expect(container).toBeDefined();
  });
  it('should set isModalOpen state to true when button is clicked', () => {
    const { getByTestId } = render(<PersonalUpdateModal setIsModalOpen={() => {}} />);
    const button = getByTestId('modal-close-icon');
    fireEvent.click(button);
  });
  it('should set isModalOpen state to true when button is clicked', () => {
    const { getByTestId } = render(<PersonalUpdateModal setIsModalOpen={() => {}} />);
    const button = getByTestId('personal-info-cancel');
    fireEvent.click(button);
  });
});
