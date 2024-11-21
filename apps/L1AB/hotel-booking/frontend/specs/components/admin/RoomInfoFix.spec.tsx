import { RoomFix } from '@/components/main/assets/RoomInfoFix';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';


describe("Admin Room Fix", () => {
    it("should render the admin room fix", () => {
        render(<RoomFix/>)
    })
})