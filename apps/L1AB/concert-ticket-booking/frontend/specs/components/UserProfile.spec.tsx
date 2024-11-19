import { UserProfile } from "@/components/UserProfile"
import { render } from "@testing-library/react"

describe('UserProfile', () => {
    it('should render successfully', async () => {
        render(<UserProfile/>)
    })
})