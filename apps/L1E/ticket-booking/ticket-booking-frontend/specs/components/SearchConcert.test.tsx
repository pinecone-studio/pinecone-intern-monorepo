import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchConcert } from '@/components/SearchConcert';

// Mock the child DatePickerConcert default export to isolate SearchConcert
jest.mock('@/components/DatePickerConcert', () => ({
	__esModule: true,
	default: () => <div data-testid="datepicker-mock" />,
}));

describe('SearchConcert', () => {
	it('renders search input', () => {
		render(<SearchConcert />);
		const input = screen.getByPlaceholderText('Хайлт');
		expect(input).toBeInTheDocument();
	});

	it('search input has required attributes', () => {
		render(<SearchConcert />);
		const input = screen.getByPlaceholderText('Хайлт');
		expect(input).toHaveAttribute('type', 'text');
		expect(input).toHaveAttribute('data-cy', 'search-input');
	});

	it('renders DatePickerConcert', () => {
		render(<SearchConcert />);
		expect(screen.getByTestId('datepicker-mock')).toBeInTheDocument();
	});
});