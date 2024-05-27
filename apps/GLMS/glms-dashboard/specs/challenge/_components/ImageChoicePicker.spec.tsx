import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChoiceImage from '../../../src/app/challenge/_components/ImageChoicePicker';

describe('ChoiceImage Component', () => {
  const choice = 'asdasd';
  const mockId = '1';
  const setSelectedChoiceMock = jest.fn();

  it('renders correctly', () => {
    const { getByAltText } = render(<ChoiceImage id={mockId} choice={choice} setSelectedChoice={setSelectedChoiceMock} selectedChoice="1" />);
    const imageElement = getByAltText('ChoiceImage');
    expect(imageElement).toBeInTheDocument();
  });

  it('triggers setSelectedChoice when image is clicked', () => {
    const { getByAltText } = render(<ChoiceImage id={mockId} choice={choice} setSelectedChoice={setSelectedChoiceMock} selectedChoice="1" />);
    const imageElement = getByAltText('ChoiceImage');
    fireEvent.click(imageElement);
    expect(setSelectedChoiceMock).toHaveBeenCalledWith('1');
  });
  it('applies correct style when selected choice matches id', () => {
    const { getByAltText } = render(<ChoiceImage id={mockId} choice={choice} setSelectedChoice={setSelectedChoiceMock} selectedChoice="1" />);
    const imageElement = getByAltText('ChoiceImage');
    expect(imageElement).toHaveClass(' object-cover rounded-[8px] opacity-70');
  });

  it('applies correct style when selected choice does not match choice._id', () => {
    const { getByAltText } = render(<ChoiceImage id={mockId} choice={choice} setSelectedChoice={setSelectedChoiceMock} selectedChoice="2" />);
    const imageElement = getByAltText('ChoiceImage');
    expect(imageElement).not.toHaveClass('opacity-70');
  });
});
