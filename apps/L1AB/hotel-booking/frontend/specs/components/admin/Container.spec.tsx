import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Container } from '@/components/admin';

describe("Admin Container", () => {
    it("should render the admin container", () => {
        render(<Container />)
    })
})