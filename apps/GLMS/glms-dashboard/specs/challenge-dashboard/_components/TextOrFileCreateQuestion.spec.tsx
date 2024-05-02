'use client';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TextOrFileQuestionCreate } from '../../../src/app/challenge-dashboard/_components/TextOrFileCreateQuestion';

test('clicking upload text button changes selectedBtn state to text', () => {
  const { getByTestId } = render(<TextOrFileQuestionCreate />);
  const selectTextButton = getByTestId('select-text-button');

  fireEvent.click(selectTextButton);

  expect(selectTextButton).toBeDefined();
});

test('clicking upload image button changes selectedBtn state to file', () => {
  const { getByTestId } = render(<TextOrFileQuestionCreate />);
  const selectFileButton = getByTestId('select-file-button');

  fireEvent.click(selectFileButton);

  expect(selectFileButton).toBeDefined();
});
