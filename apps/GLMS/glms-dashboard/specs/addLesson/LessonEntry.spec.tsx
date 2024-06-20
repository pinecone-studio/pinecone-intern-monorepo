// LessonEntry.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LessonEntry } from '../../src/app/addLesson/_components/LessonEntry';

// Mock Input and Textarea components
jest.mock('@/components/ui/input', () => ({
  Input: ({ className, placeholder, value, onChange }: never) => <input className={className} placeholder={placeholder} value={value} onChange={onChange} data-testid="input" />,
}));

jest.mock('@/components/ui/textarea', () => ({
  Textarea: ({ className, placeholder, value, onChange }: never) => <textarea className={className} placeholder={placeholder} value={value} onChange={onChange} data-testid="textarea" />,
}));

describe('LessonEntry Component', () => {
  const mockInputData = {
    title: 'Initial Title',
    topic: 'Initial Topic',
    details: 'Initial Details',
  };

  const mockSetInputData = jest.fn();

  const renderComponent = (inputData = mockInputData) => {
    return render(<LessonEntry inputData={inputData} setInputData={mockSetInputData} />);
  };

  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  it('renders without crashing', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('Сонгоно уу')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Оруулна уу...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Энд бичнэ үү...')).toBeInTheDocument();
  });

  it('displays correct initial values', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('Сонгоно уу')).toHaveValue(mockInputData.topic);
    expect(screen.getByPlaceholderText('Оруулна уу...')).toHaveValue(mockInputData.title);
    expect(screen.getByPlaceholderText('Энд бичнэ үү...')).toHaveValue(mockInputData.details);
  });

  it('calls setInputData with updated topic', () => {
    renderComponent();
    const newValue = 'Updated Topic';
    const input = screen.getByPlaceholderText('Сонгоно уу');
    fireEvent.change(input, { target: { value: newValue } });
    expect(mockSetInputData).toHaveBeenCalledTimes(1);
    // Simulate state update call
    const updater = mockSetInputData.mock.calls[0][0];
    expect(updater(mockInputData)).toEqual({
      ...mockInputData,
      topic: newValue,
    });
  });

  it('calls setInputData with updated title', () => {
    renderComponent();
    const newValue = 'Updated Title';
    const input = screen.getByPlaceholderText('Оруулна уу...');
    fireEvent.change(input, { target: { value: newValue } });
    expect(mockSetInputData).toHaveBeenCalledTimes(1);
    // Simulate state update call
    const updater = mockSetInputData.mock.calls[0][0];
    expect(updater(mockInputData)).toEqual({
      ...mockInputData,
      title: newValue,
    });
  });

  it('calls setInputData with updated details', () => {
    renderComponent();
    const newValue = 'Updated Details';
    const textarea = screen.getByPlaceholderText('Энд бичнэ үү...');
    fireEvent.change(textarea, { target: { value: newValue } });
    expect(mockSetInputData).toHaveBeenCalledTimes(1);
    // Simulate state update call
    const updater = mockSetInputData.mock.calls[0][0];
    expect(updater(mockInputData)).toEqual({
      ...mockInputData,
      details: newValue,
    });
  });

  it('matches snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
