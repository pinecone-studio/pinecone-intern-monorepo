import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Question from '../../../src/app/challenge/_components/Question';

describe('Question Component', () => {
  it('renders question text and index correctly', () => {
    const testQuestion = 'What is your favorite color?';
    const testIndex = 1;

    const { getByText } = render(<Question question={testQuestion} index={testIndex} />);

    const indexElement = getByText(`${testIndex + 1}.`);
    expect(indexElement).toBeInTheDocument();

    const questionTextElement = getByText(testQuestion);
    expect(questionTextElement).toBeInTheDocument();
  });
});
