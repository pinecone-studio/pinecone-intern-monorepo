import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import ChoiceText from '../../../src/app/challenge/_components/TextChoicePicker';

describe('ChoiceText component', () => {
  const mockChoice = { _id: '123', choice: 'Test choice' };
  const mockSelectedChoice = '123';

  const mockHandleChange = jest.fn();

  it('renders choice text correctly', () => {
    const { getByText } = render(<ChoiceText choice={mockChoice} selectedChoice={mockSelectedChoice} handleChange={mockHandleChange} />);
    expect(getByText('Test choice')).toBeDefined();
  });

  it('applies checked style when selected choice matches', () => {
    const { container } = render(<ChoiceText choice={mockChoice} selectedChoice={mockSelectedChoice} handleChange={mockHandleChange} />);
    const choiceDiv = container.firstChild;
    expect(choiceDiv).toHaveClass('flex w-[588px] items-center justify-center border border-[#000000] border-b-[4px] h-[72px] rounded-[12px] p-4');
  });

  it('applies unchecked style when selected choice does not match', () => {
    const { container } = render(<ChoiceText choice={mockChoice} selectedChoice="456" handleChange={mockHandleChange} />);
    const choiceDiv = container.firstChild;
    expect(choiceDiv).toHaveClass('flex w-[588px] justify-center items-center border h-[72px] rounded-[12px] p-4 border-[#ECEDF0]}');
  });

  it('radio button should have click', () => {
    const { getByRole } = render(<ChoiceText choice={mockChoice} selectedChoice={mockSelectedChoice} handleChange={mockHandleChange} />);
    const radioInput = getByRole('radio');
    expect(fireEvent.click(radioInput)).toBeDefined();
  });
});
