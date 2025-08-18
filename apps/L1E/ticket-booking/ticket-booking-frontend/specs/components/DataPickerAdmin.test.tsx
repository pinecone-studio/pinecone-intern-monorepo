/**
 * @jest-environment jsdom
 */
'use client'

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DatePickerAdmin } from '@/components/DatePickerAdmin';

describe('DatePickerAdmin', () => {
    it('renders without crashing', () => {
        render(<DatePickerAdmin />);
        const input = screen.getByPlaceholderText('Өдөр сонгох');
        expect(input).toBeInTheDocument();
    });

    it('opens calendar on input click', () => {
        render(<DatePickerAdmin />);
        const input = screen.getByPlaceholderText('Өдөр сонгох');
        fireEvent.click(input);
        const calendar = screen.getByRole('dialog'); // react-datepicker uses role="dialog"
        expect(calendar).toBeInTheDocument();
    });

    it('selects a date', () => {
        render(<DatePickerAdmin />);
        const input = screen.getByPlaceholderText('Өдөр сонгох');
        fireEvent.click(input);

        const today = new Date();
        const day = screen.getByText(today.getDate().toString());

        fireEvent.click(day);
        expect((input as HTMLInputElement).value).toMatch(/\d{4}\/\d{2}\/\d{2}/); // yyyy/mm/dd
    });
});
