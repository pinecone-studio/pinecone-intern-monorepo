import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { PersonalInformation } from '../../src/app/employee-details/_components';
describe('personalInfromation', () => {
  const props = {
    lastName: 'М.Ганбат',
    email: 'Zoloosoko0526@gmail.com',
  };
  it('should render perdonalInfromation components', () => {
    const { container, getByTestId } = render(<PersonalInformation email={props.email} lastName={props.lastName} />);
    expect(container).toBeDefined();
    const button = getByTestId('update-button');
    fireEvent.click(button);
    expect(button).toBeDefined();
  });
});
