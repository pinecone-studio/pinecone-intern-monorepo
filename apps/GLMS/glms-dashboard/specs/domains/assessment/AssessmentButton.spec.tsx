import { render } from '@testing-library/react';
import { AssessmentButton } from '@/domains/assessment';

describe('AssessmentButton', () => {
  it('Should render assessment button component', () => {
    const { container } = render(<AssessmentButton text="hello test" />);
    expect(container).toBeDefined();
  });
});
