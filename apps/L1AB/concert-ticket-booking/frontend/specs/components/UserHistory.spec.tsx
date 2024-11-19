import { UserHistory } from "@/components/UserHistory"
import { render } from "@testing-library/react"

describe('UserHistory', () => {
    it('should render successfully', async () => {
        render(<UserHistory/>)
    })
})