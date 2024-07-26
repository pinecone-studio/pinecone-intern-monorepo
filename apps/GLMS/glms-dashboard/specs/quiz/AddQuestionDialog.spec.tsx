import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import {AddQuestionDialog} from '../../src/app/admin/quiz/_components/AddQuestionDialog'

const mockSetIsOpen = jest.fn();
const mockSetQuestionText = jest.fn();
const mockHandleOptionChange = jest.fn();
const mockHandleSubmit= jest.fn();

const options = [
  { optionText: 'Option 1', isCorrect: false },
  { optionText: 'Option 2', isCorrect: false },
  { optionText: 'Option 3', isCorrect: false },
  { optionText: 'Option 4', isCorrect: false },
];

describe('AddQuestionDialog', ()=>{
  beforeEach(() => {
      jest.clearAllMocks();
  })

  it('opens the dialog when button is clicked', () => {
    render(
      <AddQuestionDialog
        isOpen={false}
        setIsOpen={mockSetIsOpen}
        questionText=""
        setQuestionText={mockSetQuestionText}
        options={options}
        handleOptionChange={mockHandleOptionChange}
        handleSubmit={mockHandleSubmit}
        loading={false}
      />
    );
    
    fireEvent.click(screen.getByTestId('open-dialog-button'));
    expect(mockSetIsOpen).toHaveBeenCalledWith(true);
  });

  it('renders AddQuestionDialog component', ()=>{
    render(
        <AddQuestionDialog
          isOpen={true}
          setIsOpen={mockSetIsOpen}
          questionText=''
          setQuestionText={mockSetQuestionText}
          options={options}
          handleOptionChange={mockHandleOptionChange}
          handleSubmit={mockHandleSubmit}
          loading={false}
        />
    );

    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    expect(screen.getByTestId('question-input')).toBeInTheDocument();
    options.forEach((option, index) => {
      expect(screen.getByTestId(`option-${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`option-input-${index}`)).toHaveValue(option.optionText);
      expect(screen.getByTestId(`correct-checkbox-${index}`)).not.toBeChecked();
    });
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  })

  it('handle input changes', () => {
      render(
        <AddQuestionDialog
          isOpen={true}
          setIsOpen={mockSetIsOpen}
          questionText=""
          setQuestionText={mockSetQuestionText}
          options={options}
          handleOptionChange={mockHandleOptionChange}
          handleSubmit={mockHandleSubmit}
          loading={false}
        />
      );

      fireEvent.change(screen.getByTestId('question-input'), {target: {value: 'New Question'}});
      expect(mockSetQuestionText).toHaveBeenCalledWith('New Question')
      fireEvent.change(screen.getByTestId("option-input-0"), {target: {value: "New Option 1"}});
      expect(mockHandleOptionChange).toHaveBeenCalledWith(0, 'optionText', 'New Option 1')
  });

  it('handles checkbox change', ()=>{
      render(
        <AddQuestionDialog
          isOpen={true}
          setIsOpen={mockSetIsOpen}
          questionText=""
          setQuestionText={mockSetQuestionText}
          options={options}
          handleOptionChange={mockHandleOptionChange}
          handleSubmit={mockHandleSubmit}
          loading={false}
        />
      );

      fireEvent.click(screen.getByTestId('correct-checkbox-0'));
      expect(mockHandleOptionChange).toHaveBeenCalledWith(0, 'isCorrect', true)
  });

  it("handle submit", () => {
      render(
        <AddQuestionDialog
          isOpen={true}
          setIsOpen={mockSetIsOpen}
          questionText="Question"
          setQuestionText={mockSetQuestionText}
          options={options}
          handleOptionChange={mockHandleOptionChange}
          handleSubmit={mockHandleSubmit}
          loading={false}
        />
      );

      fireEvent.click(screen.getByTestId('submit-button'));
      expect(mockHandleSubmit).toHaveBeenCalled()
  });

  it('disables submit button when loading', () => {
      render(
        <AddQuestionDialog
          isOpen={true}
          setIsOpen={mockSetIsOpen}
          questionText="Question"
          setQuestionText={mockSetQuestionText}
          options={options}
          handleOptionChange={mockHandleOptionChange}
          handleSubmit={mockHandleSubmit}
          loading={true}
        />
      );
    
      expect(screen.getByTestId('submit-button')).toBeDisabled();
      expect(screen.getByText('Please wait')).toBeInTheDocument();
  });
})