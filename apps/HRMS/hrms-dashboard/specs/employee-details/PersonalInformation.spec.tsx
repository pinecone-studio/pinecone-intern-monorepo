import React from 'react';
import { render } from '@testing-library/react';
import PersonalInformation from '../../src/app/employee-details/update/[id]/_features/PersonalInformation';

describe('PersonalInformation', () => {
  const props = {
    lastName: 'М.Ганбат',
    email: 'Zoloosoko0526@gmail.com',
  };

  it('should render PersonalInformation component', () => {
    const { container } = render(<PersonalInformation email={props.email} lastName={props.lastName} />);
    expect(container).toBeDefined();
  });
});
