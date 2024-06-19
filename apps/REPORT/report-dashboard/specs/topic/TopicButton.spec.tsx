import { render } from '@testing-library/react';
import { TopicButton } from '../../src/app/topic/_components';
import React from 'react';

describe('AssessmentButton', () => {
  it('Should render assessment button component', () => {
    const { container } = render(<TopicButton text="hello test" />);
    expect(container).toBeDefined();
  });
});
