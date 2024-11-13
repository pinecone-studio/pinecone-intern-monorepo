import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HotelDetails } from '@/components/admin';

describe("Admin Hotel Details", () => {
    it("should render the admin hotel details", () => {
        render(<HotelDetails />)
    })
})