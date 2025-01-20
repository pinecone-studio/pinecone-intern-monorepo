import OrderHistory from "@/components/order-history/OrderHistory"
import { render } from "@testing-library/react"

describe('OrderHistory',() =>{
    it('orderhistory',async () =>{
        render(<OrderHistory/>)
    })
})