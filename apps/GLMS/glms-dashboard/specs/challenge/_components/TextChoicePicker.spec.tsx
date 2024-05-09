import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import ChoiceText from '../../../src/app/challenge/_components/TextChoicePicker';

describe('ChoiceText component', () => {
  const mockId = '123';
  const mockChoice = 'Test choice';
  const mockSelectedChoice = '123';

  const mockHandleChange = jest.fn();

  it('renders choice text correctly', () => {
    const { getByText } = render(<ChoiceText choice={mockChoice} id={mockId} selectedChoice={mockSelectedChoice} handleChange={mockHandleChange} />);
    expect(getByText('Test choice')).toBeDefined();
  });

  it('applies checked style when selected choice matches', () => {
    const { container } = render(<ChoiceText choice={mockChoice} id={mockId} selectedChoice={mockSelectedChoice} handleChange={mockHandleChange} />);
    const choiceDiv = container.firstChild;
    expect(choiceDiv).toHaveClass('flex w-[588px] items-center justify-center border border-[#000000] border-b-[4px] h-[72px] rounded-[12px] p-4');
  });

  it('applies unchecked style when selected choice does not match', () => {
    const { container } = render(<ChoiceText choice={mockChoice} id="123456" selectedChoice={mockSelectedChoice} handleChange={mockHandleChange} />);
    const choiceDiv = container.firstChild;
    expect(choiceDiv).toHaveClass('flex w-[588px] justify-center items-center border h-[72px] rounded-[12px] p-4 border-[#ECEDF0]}');
  });
  it('calls handleChange when clicked', () => {
    const { getByTestId } = render(<ChoiceText choice={mockChoice} id={mockId} selectedChoice={mockSelectedChoice} handleChange={mockHandleChange} />);
    const container = getByTestId('container');
    fireEvent.click(container);
    expect(mockHandleChange).toHaveBeenCalled();
  });
  it('Render not checked checkbox if not selected', () => {
    const { getByTestId } = render(<ChoiceText choice={mockChoice} id="12345" selectedChoice={mockSelectedChoice} handleChange={mockHandleChange} />);
    const checkbox = getByTestId('checkbox');
    expect(checkbox).toContainHTML(
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="#1C2024" fill-opacity="0.24" /></svg>'
    );
  });
  it('Render checked checkbox if selected', () => {
    const { getByTestId } = render(<ChoiceText choice={mockChoice} id={mockId} selectedChoice={mockSelectedChoice} handleChange={mockHandleChange} />);
    const checkbox = getByTestId('checkbox');
    expect(checkbox).toContainHTML(
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#000000" /></svg>'
    );
  });
});
