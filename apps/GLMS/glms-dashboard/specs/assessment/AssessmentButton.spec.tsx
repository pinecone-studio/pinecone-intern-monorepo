import React from 'react';
import { render } from '@testing-library/react';
import { AssessmentButton } from '../../src/app/assessment/_components/AssessmentButton';

describe('AssessmentButton component', () => {
  test('renders button with correct text', () => {
    const buttonText = 'Click me';
    const { getByText } = render(<AssessmentButton text={buttonText} />);
    const buttonElement = getByText(buttonText);
    
    expect(buttonElement.tagName).toBe('BUTTON');
  });
});
