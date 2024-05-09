import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { PersonalInformation } from '../../src/app/employee-details/_components';

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
