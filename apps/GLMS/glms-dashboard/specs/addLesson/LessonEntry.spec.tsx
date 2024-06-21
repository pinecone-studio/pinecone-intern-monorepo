import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LessonEntry, InputData } from '../../src/app/addLesson/_components/LessonEntry';
import { act } from 'react-dom/test-utils';

describe('LessonEntry', () => {
  const mockInputData: InputData = {
    title: '',
    topic: '',
    details: '',
  };

  const mockSetInputData = jest.fn();

  beforeEach(() => {
    mockSetInputData.mockClear();
  });

  it('updates the inputData state correctly when input fields are changed', () => {
    const { getByTestId } = render(<LessonEntry inputData={mockInputData} setInputData={mockSetInputData} />);

    const topicInput = getByTestId('lesson_input_comp');
    expect(topicInput).toBeInTheDocument();
    console.log('====>>>>', topicInput);

    act(() => {
      fireEvent.change(topicInput, { target: { value: 'Test-Lesson' } });
    });

    const titleInput = getByTestId('lesson_input_sec_comp');
    expect(titleInput).toBeInTheDocument();
    console.log('====>>>>', titleInput);

    act(() => {
      fireEvent.change(titleInput, { target: { value: 'Test-Lesson' } });
    });

    const detailsTextarea = getByTestId('lesson_text_area_comp');
    expect(detailsTextarea).toBeInTheDocument();
    console.log('====>>>>', detailsTextarea);

    act(() => {
      fireEvent.change(detailsTextarea, { target: { value: 'Test-Lesson' } });
    });
  });
});
