import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ModalRefuse } from '@/components/ModalRefuse';

describe('ModalRefuse',() =>{
    it('renders the component', () =>{
        render(<ModalRefuse/>);
        expect(screen.getAllByText('Татгалзсан шалтгаан'));
    });
});