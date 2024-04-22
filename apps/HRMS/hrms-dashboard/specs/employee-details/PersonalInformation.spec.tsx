import React from 'react';
import { render } from '@testing-library/react';
import { PersonalInformation } from '../../src/app/employee-details/_components';
describe('personalInfromation', () => {
  const props = {
    lastName: 'М.Ганбат',
    email: 'Zoloosoko0526@gmail.com',
  };
  it('should render perdonalInfromation components', () => {
    const { container } = render(<PersonalInformation id="1" email={props.email} lastName={props.lastName} />);
    expect(container).toBeDefined();
  });
});
