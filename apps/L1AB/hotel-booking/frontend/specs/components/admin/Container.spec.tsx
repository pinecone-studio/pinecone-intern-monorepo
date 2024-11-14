import '@testing-library/jest-dom';
import { render,screen } from '@testing-library/react';
import { Container } from '@/components/admin';

describe("Admin Container", () => {
    it("should render the admin container with sidebar, header, footer, and children", () => {
        render(
            <Container>
                <div data-testid="children">Test Children</div>
            </Container>
        );

        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();

        expect(screen.getByTestId('children')).toBeInTheDocument();
    });
})