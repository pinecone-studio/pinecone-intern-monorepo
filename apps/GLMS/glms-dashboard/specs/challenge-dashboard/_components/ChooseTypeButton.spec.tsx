import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ChooseTypeButton } from '../../../src/app/challenge-dashboard/_component/ChooseTypeButton';

test('clicking choose button changes chooseBtn state', () => {
  const { getByText } = render(<ChooseTypeButton />);
  const chooseButton = getByText('Сонгох');
  fireEvent.click(chooseButton);
  const chooseBtnStyle = getComputedStyle(chooseButton);
  expect(chooseBtnStyle.backgroundColor).toBe('transparent');
});

test('clicking photo button changes chooseBtn state', () => {
  const { getByText } = render(<ChooseTypeButton />);
  const photoButton = getByText('Зураг');
  fireEvent.click(photoButton);
  const chooseButton = getByText('Сонгох');
  const chooseBtnStyle = getComputedStyle(chooseButton);
  expect(chooseBtnStyle.backgroundColor).toBe('transparent');
});
