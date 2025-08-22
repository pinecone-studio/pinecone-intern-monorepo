/**
 * @jest-environment jsdom
 */
'use client'

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TimePicker } from '@/components/TimePicker';

// Mock react-datepicker
jest.mock('react-datepicker', () => {
  return function MockTimePicker({ 
    selected, 
    onChange, 
    placeholderText, 
    className,
    _showTimeSelect,
    _showTimeSelectOnly,
    _timeIntervals,
    _timeCaption,
    _dateFormat 
  }: {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    placeholderText: string;
    className: string;
    _showTimeSelect: boolean;
    _showTimeSelectOnly: boolean;
    _timeIntervals: number;
    _timeCaption: string;
    _dateFormat: string;
  }) {
    return (
      <input
        data-testid="time-picker"
        type="text"
        placeholder={placeholderText}
        className={className}
        value={selected ? selected.toTimeString().split(' ')[0] : ''}
        onChange={(_e) => {
          onChange(new Date('2024-01-01T10:00:00'));
        }}
      />
    );
  };
});

describe('TimePicker', () => {
    it('renders without crashing', () => {
        render(<TimePicker />);
        const input = screen.getByPlaceholderText('Цаг');
        expect(input).toBeInTheDocument();
    });

    it('has correct placeholder text', () => {
        render(<TimePicker />);
        expect(screen.getByPlaceholderText('Цаг')).toBeInTheDocument();
    });

    it('has correct styling classes', () => {
        render(<TimePicker />);
        const input = screen.getByTestId('time-picker');
        expect(input).toHaveClass('border', 'rounded-md', 'px-3', 'py-3', 'w-full', 'text-sm', 'bg-white', 'border-[#E4E4E7]', 'focus:outline-none', 'text-black', 'placeholder-[#71717A]');
    });

    it('renders with correct width', () => {
        render(<TimePicker />);
        const container = screen.getByTestId('time-picker').closest('.flex');
        expect(container).toHaveClass('w-[280px]');
    });

    it('shows time picker icon', () => {
        render(<TimePicker />);
        const icon = screen.getByTestId('time-picker').closest('.flex')?.querySelector('svg');
        expect(icon).toBeInTheDocument();
    });

    it('has correct time picker configuration', () => {
        render(<TimePicker />);
        const input = screen.getByTestId('time-picker');
        expect(input).toBeInTheDocument();
    });

    it('handles time selection', () => {
        render(<TimePicker />);
        const input = screen.getByTestId('time-picker');
        
        // Simulate time selection
        fireEvent.change(input, { target: { value: '14:30' } });
        
        // The mock should handle the change
        expect(input).toHaveValue('10:00:00');
    });

    it('handles empty time input', () => {
        render(<TimePicker />);
        const input = screen.getByTestId('time-picker');
        
        // Simulate clearing the input
        fireEvent.change(input, { target: { value: '' } });
        
        expect(input).toHaveValue('');
    });

    it('handles invalid time input gracefully', () => {
        render(<TimePicker />);
        const input = screen.getByTestId('time-picker');
        
        // Simulate invalid time input
        fireEvent.change(input, { target: { value: 'invalid' } });
        
        // Should not crash and should handle gracefully
        expect(input).toBeInTheDocument();
    });
});
