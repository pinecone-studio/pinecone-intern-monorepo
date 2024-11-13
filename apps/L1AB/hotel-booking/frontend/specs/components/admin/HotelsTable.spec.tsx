import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HotelsTable } from '@/components/admin';

describe("Admin Hotels Table", () => {
    it("should render the admin hotels table", () => {
        render(<HotelsTable />)
    })
})