import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SuggestCard } from '@/components/SuggestCard';

describe('SuggestCard', () => {
    it('sould render successfully', async () => {
        render(<SuggestCard/>);
    })
})