import '@testing-library/jest-dom';
import {render }from'@testing-library/react';
import { PriceDetailDialog} from '@/components/main/PriceDetails'
describe('Admin PriceDetails',()=>{
    it('should render the admin price details',()=>{
        render(<PriceDetailDialog/>)
    })
})