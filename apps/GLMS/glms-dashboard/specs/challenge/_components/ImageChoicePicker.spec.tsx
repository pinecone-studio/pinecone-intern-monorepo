import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChoiceImage from '../../../src/app/challenge/_components/ImageChoicePicker';

describe('ChoiceImage Component', () => {
  const choice = { _id: '1', choice: 'image-url.jpg' };
  const setSelectedChoiceMock = jest.fn();

  it('renders correctly', () => {
    const { getByAltText } = render(<ChoiceImage choice={choice} setSelectedChoice={setSelectedChoiceMock} selectedChoice="1" />);
    const imageElement = getByAltText('ChoiceImage');
    expect(imageElement).toBeInTheDocument();
  });

  it('triggers setSelectedChoice when image is clicked', () => {
    const { getByAltText } = render(<ChoiceImage choice={choice} setSelectedChoice={setSelectedChoiceMock} selectedChoice="1" />);
    const imageElement = getByAltText('ChoiceImage');
    fireEvent.click(imageElement);
    expect(setSelectedChoiceMock).toHaveBeenCalledWith('1');
  });

  it('applies correct style based on selected choice', () => {
    const { getByAltText } = render(<ChoiceImage choice={choice} setSelectedChoice={setSelectedChoiceMock} selectedChoice="1" />);
    const imageElement = getByAltText('ChoiceImage');
    expect(imageElement).toHaveClass('opacity-70');
  });
  it('applies correct style when selected choice matches choice._id', () => {
    const { getByAltText } = render(<ChoiceImage choice={choice} setSelectedChoice={setSelectedChoiceMock} selectedChoice="1" />);
    const imageElement = getByAltText('ChoiceImage');
    expect(imageElement).toHaveClass('opacity-70');
  });

  it('applies correct style when selected choice does not match choice._id', () => {
    const { getByAltText } = render(<ChoiceImage choice={choice} setSelectedChoice={setSelectedChoiceMock} selectedChoice="2" />);
    const imageElement = getByAltText('ChoiceImage');
    expect(imageElement).not.toHaveClass('opacity-70'); // Ensure opacity-70 class is not applied when not selected
  });
});
