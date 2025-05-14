import Card from '@/app/_components/Card/Page'
import '@testing-library/jest-dom'
import {render} from '@testing-library/react'
import React from 'react'

describe('Card',()=>{
    it ('render Card component', ()=>{
        const { getByTestId } = render(<Card />);
        expect(getByTestId('card-component')).toBeInTheDocument();
    })
})