import { FooterComponent } from '@/components/main/FooterComponent';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe("Footer component", () => {
    it("should render the footer component", () => {
        render(<FooterComponent />)
    })
})