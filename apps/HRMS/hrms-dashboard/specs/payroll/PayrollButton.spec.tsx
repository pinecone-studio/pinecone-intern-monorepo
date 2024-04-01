import { render } from '@testing-library/react';
import { PayrollButton } from '../../src/app/payroll/_components';

describe('AssessmentButton', () => {
  it('Should render assessment button component', () => {
    const { container } = render(<PayrollButton text="hello test" />);
    expect(container).toBeDefined();
  });
});
