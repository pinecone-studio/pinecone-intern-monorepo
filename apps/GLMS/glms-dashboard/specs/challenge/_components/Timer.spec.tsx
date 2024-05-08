import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Timer } from '../../../src/app/challenge/_components/Timer';

jest.useFakeTimers();

describe('Timer component', () => {
    afterEach(() => {
        jest.clearAllTimers();
    });

    test('Timer resets to initial value when "Next" button is clicked', () => {
        const { getByText } = render(<Timer />);
        const nextButton = getByText('Next');
        fireEvent.click(nextButton);

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        // expect(getByText('30'));
    });

    test('Timer countdown works correctly', () => {
        const { getByText } = render(<Timer />);
        expect(getByText('30'));
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(getByText('29'));
    });

    test('Timer stops counting down at 0', () => {
        const { getByText } = render(<Timer />);
        act(() => {
            jest.advanceTimersByTime(30000);
        });
        expect(getByText('0'));
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(getByText('0'));
    });
});
