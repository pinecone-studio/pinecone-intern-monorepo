import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LessonEntry } from '../../src/app/addLesson/_components/LessonEntry';

describe('LessonEntry Component', () => {
  const mockInputData = {
    topic: '',
    title: '',
    details: '',
  };

  const mockHandleInputChange = jest.fn();

  it('renders correctly', () => {
    const { getByTestId } = render(<LessonEntry inputData={mockInputData} handleInputChange={mockHandleInputChange} />);

    expect(getByTestId('lesson_input_comp')).toBeInTheDocument();
    expect(getByTestId('lesson_input_sec_comp')).toBeInTheDocument();
    expect(getByTestId('lesson_text_area_comp')).toBeInTheDocument();
  });

  it('calls handleInputChange on input change', () => {
    const { getByTestId } = render(<LessonEntry inputData={mockInputData} handleInputChange={mockHandleInputChange} />);

    fireEvent.change(getByTestId('lesson_input_comp'), { target: { value: 'New Topic' } });
    expect(mockHandleInputChange).toHaveBeenCalledWith('topic');

    fireEvent.change(getByTestId('lesson_input_sec_comp'), { target: { value: 'New Title' } });
    expect(mockHandleInputChange).toHaveBeenCalledWith('title');

    fireEvent.change(getByTestId('lesson_text_area_comp'), { target: { value: 'New Details' } });
    expect(mockHandleInputChange).toHaveBeenCalledWith('details');
  });
});
