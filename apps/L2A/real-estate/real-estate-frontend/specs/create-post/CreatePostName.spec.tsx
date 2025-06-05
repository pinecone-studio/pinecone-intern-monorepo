import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { CreatePostName } from '@/app/create-post/_components/CreatePostName';
import '@testing-library/jest-dom';

describe('CreatePostName component', () => {
  const props = {
    name: 'title',
    value: 'Test Title',
    onChange: jest.fn(),
    onBlur: jest.fn(),
    error: '',
  };

  it('should render input and label correctly', () => {
    render(<CreatePostName {...props} />);
    expect(screen.getByLabelText('Эзэмшигчийн Нэр')).toBeInTheDocument();
    expect(screen.getByTestId('Title')).toHaveValue('Test Title');
  });

  it('should call onChange when input changes', () => {
    render(<CreatePostName {...props} />);
    const input = screen.getByTestId('Title');
    fireEvent.change(input, { target: { value: 'Updated Title' } });
    expect(props.onChange).toHaveBeenCalled();
  });

  it('should call onBlur when input loses focus', () => {
    render(<CreatePostName {...props} />);
    const input = screen.getByTestId('Title');
    fireEvent.blur(input);
    expect(props.onBlur).toHaveBeenCalled();
  });

  it('should show error message if error exists', () => {
    render(<CreatePostName {...props} error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should show invisible placeholder if no error', () => {
    render(<CreatePostName {...props} />);
    const placeholder = screen.getByText('placeholder');
    expect(placeholder).toHaveClass('invisible');
  });
});
