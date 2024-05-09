'use client';
import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TextOrFileQuestionCreate } from '../../../src/app/challenge-dashboard/_components/TextOrFileCreateQuestion';

test('clicking upload text button changes selectedBtn state to text', () => {
  const selectedBtn = 'TEXT';
  const handleSelectText = jest.fn();
  const handleSelectFile = jest.fn();

  const { getByTestId } = render(<TextOrFileQuestionCreate selectedBtn={selectedBtn} handleSelectText={handleSelectText} handleSelectFile={handleSelectFile} />);
  const selectTextButton = getByTestId('select-text-button');

  fireEvent.click(selectTextButton);
  expect(selectTextButton).toHaveClass('bg-black text-white');
  expect(selectTextButton).toBeDefined();
});

test('clicking upload image button changes selectedBtn state to file', () => {
  const selectedBtn = 'IMAGE';
  const handleSelectText = jest.fn();
  const handleSelectFile = jest.fn();
  const { getByTestId } = render(<TextOrFileQuestionCreate selectedBtn={selectedBtn} handleSelectText={handleSelectText} handleSelectFile={handleSelectFile} />);
  const selectFileButton = getByTestId('select-file-button');

  fireEvent.click(selectFileButton);

  expect(selectFileButton).toBeDefined();
});
