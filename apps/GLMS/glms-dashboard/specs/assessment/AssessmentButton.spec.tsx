import { AssessmentButton } from '../../src/app/assessment/_components';
import React from 'react';
import { render } from '@testing-library/react';

describe('Assessment', () => {
  it('Should render assessment button component', () => {
    const { container } = render(<AssessmentButton text="hello test" />);
    expect(container).toBeDefined();
  });
});
