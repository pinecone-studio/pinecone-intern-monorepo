import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SideBar } from '@/components/admin/assets';

describe("Admin Side Bar", () => {
    it("should render the admin side bar", () => {
        render(<SideBar />)
    })
})