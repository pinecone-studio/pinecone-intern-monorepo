import { UserHeader } from '@/components/main';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Main User Header', () => {
    it('Should render the main user header', () => {
        render(<UserHeader/>);
    });
});

