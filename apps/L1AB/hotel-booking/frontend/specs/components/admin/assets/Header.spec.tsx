import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Header } from '@/components/admin/assets';

describe("Admin Header", () => {
    it("should render the admin header", () => {
        render(<Header />)
    })
})