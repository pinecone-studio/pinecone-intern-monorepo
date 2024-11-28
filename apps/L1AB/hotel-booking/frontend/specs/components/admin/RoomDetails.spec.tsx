import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { RoomDetails } from '@/components/admin';

describe("Admin Room Details", () => {
    it("should render the admin room details", () => {
        render(<RoomDetails />)
    })
})

