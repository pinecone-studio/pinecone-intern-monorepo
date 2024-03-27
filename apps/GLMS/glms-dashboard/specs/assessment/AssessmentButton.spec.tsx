import React from 'react';
import { render } from '@testing-library/react';
import { AssessmentButton } from '../../src/app/assessment/_components/AssessmentButton';

describe('AssessmentButton', () => {
  it('Should render assessment button component', () => {
    const { container } = render(<AssessmentButton text="hello test" />);
    expect(container).toBeDefined();
  });
});
