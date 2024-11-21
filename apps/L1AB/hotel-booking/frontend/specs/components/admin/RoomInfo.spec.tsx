import { RoomInfo } from '@/components/main/RoomInfo';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';


describe("Admin Room Info", () => {
    it("should render the admin room info", () => {
        render(<RoomInfo/>)
    })
})