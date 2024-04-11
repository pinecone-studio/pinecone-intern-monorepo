import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchInput from '../../src/app/dashboard/_components/SearchInput';

describe('SearchInput', () => {
    it('Should render searchinput', () => {
        const { container } = render(<SearchInput />);
        expect(container).toBeDefined();
    });

    it('renders with placeholder text', () => {
        render(<SearchInput />);
        const inputElement = screen.getByPlaceholderText('Нийтлэл, шошгоор хайх');
        expect(inputElement).toBeDefined();
    });

});
