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
    const { container } = render(<CustomInput label={props.label} type={props.label} placeholder={props.placeholder} name="3" />);
    expect(container).toBeDefined();
  });

  it('should render select input', () => {
    const { container } = render(<CustomInput label={props.label} type="select" name="3" />);
    expect(container).toBeDefined();
  });

  it('should render select input', () => {
    const { getByTestId } = render(<CustomInput label={props.label} type="select" value={'true'} name="3" />);
    const selectInput = getByTestId('select-input');
    expect(selectInput).toBeDefined();
    expect(selectInput.style.color).toMatch('rgb(18, 19, 22)');
  });
});
