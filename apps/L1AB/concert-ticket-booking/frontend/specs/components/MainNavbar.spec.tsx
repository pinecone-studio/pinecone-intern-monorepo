import { MainNavbar } from "@/components/providers"
import { render } from "@testing-library/react"

describe('MainNavbar', () => {
    it('should render successfully', async () => {
        render(<MainNavbar/>)
    })
})