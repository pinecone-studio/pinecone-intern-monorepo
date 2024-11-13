import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { GuestsTable } from '@/components/admin';

describe("Admin Guests Table", () => {
    it("should render the admin guests table", () => {
        render(<GuestsTable />)
    })
})