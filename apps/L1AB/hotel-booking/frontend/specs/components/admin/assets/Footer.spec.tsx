import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Footer } from '@/components/admin/assets';

describe("Admin Footer", () => {
    it("should render the admin footer", () => {
        render(<Footer />)
    })
})