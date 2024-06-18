// import React from 'react';
// import { render, screen, fireEvent, act } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { Steps } from '../../src/app/employee-details/_components/add-employee-steps/Steps';

// const setAddEmployeesDetails = jest.fn();

// jest.mock('formik', () => ({
//   useFormik: jest.fn(() => ({
//     initialValues: {},
//     onSubmit: (values) => {
//       setAddEmployeesDetails(values);
//     },
//   })),
// }));

// describe('Steps Component', () => {
//   it('submits form data', () => {
//     render(<Steps />);

//     const buttonInput = screen.getByTestId('submitBt');
//     act(() => {
//       fireEvent.click(buttonInput);
//     });
//   });
// });

import React from 'react';
import { render } from '@testing-library/react';
import { StepOne } from '../../src/app/employee-details/_components/add-employee-steps/StepOne';
import { StepTwo } from '../../src/app/employee-details/_components/add-employee-steps/StepTwo';
import { StepThree } from '../../src/app/employee-details/_components/add-employee-steps/StepThree';

describe('personalInfromation', () => {
  const props = {
    label: 'testLabel',
    type: 'text',
    placeholder: 'testPlaceholder',
    name: 'testNAme',
    value: 'testValue',
  };
  it('should render perdonalInfromation components', () => {
    const { container } = render(<StepOne label={props.label} type={props.label} placeholder={props.placeholder} name={props.name} value={props.value} />);
    expect(container).toBeDefined();
  });

  it('should render select input', () => {
    const { container } = render(<StepTwo label={props.label} type="select" name={props.name} value={props.value} />);
    expect(container).toBeDefined();
  });
  it('should render select input', () => {
    const { container } = render(<StepThree label={props.label} type="select" name={props.name} value={props.value} />);
    expect(container).toBeDefined();
  });
});
