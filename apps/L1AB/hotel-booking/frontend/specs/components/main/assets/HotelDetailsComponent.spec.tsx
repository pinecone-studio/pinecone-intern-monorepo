import '@testing-library/jest-dom';
import { render } from "@testing-library/react"
import { HotelDetailsComponent } from "@/components/main/assets/HotelDetailsComponent"

describe('Main Hotel Details Component', () => {
    it('should render the main hotel details component', () => {
        render(<HotelDetailsComponent/>)
    })
})