import React from 'react';
import { render } from '@testing-library/react';
import { TestScore } from '../../src/app/challenge/_components/TestScore';

describe('TestScore component', () => {
    it('renders correct score', () => {
        const { getByText } = render(<TestScore />);

        expect(getByText('10/7'));
    });

});