import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { GuestInfo } from '@/components/admin';

describe("Admin Guest Info", () => {
    it("should render the admin guest info", () => {
        render(<GuestInfo />)
    })
})