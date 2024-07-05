import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CourseEntry, InputData } from '../../src/app/addCourse/_components/CourseEntry';

describe('LessonEntry Component', () => {
  const mockInputData: InputData = {
    title: '',
    content: '',
  };

  const mockHandleInputChange = jest.fn((_field: keyof InputData) => (_e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {});

  it('renders correctly', () => {
    const { getByTestId } = render(<CourseEntry inputData={mockInputData} handleInputChange={mockHandleInputChange} />);

    expect(getByTestId('lesson_input_sec_comp')).toBeInTheDocument();
    expect(getByTestId('lesson_text_area_comp')).toBeInTheDocument();
  });

  it('calls handleInputChange on input change', () => {
    const { getByTestId } = render(<CourseEntry inputData={mockInputData} handleInputChange={mockHandleInputChange} />);

    fireEvent.change(getByTestId('lesson_input_sec_comp'), { target: { value: 'New Title' } });
    expect(mockHandleInputChange).toHaveBeenCalledWith('title');

    fireEvent.change(getByTestId('lesson_text_area_comp'), { target: { value: 'New Content' } });
    expect(mockHandleInputChange).toHaveBeenCalledWith('content');
  });
});
