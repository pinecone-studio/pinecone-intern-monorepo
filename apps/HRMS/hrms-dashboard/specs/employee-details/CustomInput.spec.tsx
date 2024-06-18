import React from 'react';
import { render } from '@testing-library/react';
import StepOne from '../../src/app/employee-details/_components/add-employee-steps/StepOne';
import StepTwo from '../../src/app/employee-details/_components/add-employee-steps/StepTwo';
import StepThree from '../../src/app/employee-details/_components/add-employee-steps/StepThree';

describe('stepOne', () => {
  const props = {
    label: 'testLabel',
    type: 'testType',
    placeholder: 'testPlaceholder',
    name: 'testName',
    value: 'testValue',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it('StepOne Component', () => {
    const { container } = render(<StepOne label={props.label} type={props.label} placeholder={props.placeholder} name={props.name} value={props.value} />);
    expect(container).toBeDefined();
  });

  it('StepTwo Component', () => {
    const { container } = render(<StepTwo label={props.label} type={props.label} placeholder={props.placeholder} name={props.name} value={props.value} />);
    expect(container).toBeDefined();
  });

  it('StepThree Component', () => {
    const { container } = render(<StepThree label={props.label} type={props.label} placeholder={props.placeholder} name={props.name} value={props.value} />);
    expect(container).toBeDefined();
  });
});
