import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PersonalInformation from '../../src/app/employee-details/_features/PersonalInformation';

describe('PersonalInformation', () => {
  const props = {
    lastName: 'М.Ганбат',
    email: 'Zoloosoko0526@gmail.com',
  };
  it('should render PersonalInformation component', () => {
    const { container } = render(<PersonalInformation email={props.email} lastName={props.lastName} />);
    expect(container).toBeDefined();
  });

  it('should set isModalOpen state to true when button is clicked', () => {
    const { getByTestId } = render(<PersonalInformation />);
    const button = getByTestId('update-button-info');
    fireEvent.click(button);
  });
    it('should render the icon', () => {
      const { getByTestId } = render(<PersonalInformation />);
      const iconElement = getByTestId('phoneIcon');
      fireEvent.click(iconElement);
    });
});
