import React from 'react';
import { render } from '@testing-library/react';
import { CustomInput } from '../../src/app/employee-details/_components';

describe('personalInfromation', () => {
  const props = {
    label: 'testLabel',
    type: 'text',
    placeholder: 'testPlaceholder',
  };
  it('should render perdonalInfromation components', () => {
    const { container } = render(<CustomInput label={props.label} type={props.label} placeholder={props.placeholder} />);
    expect(container).toBeDefined();
  });
});
