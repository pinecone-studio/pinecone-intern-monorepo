import React from 'react';
import { render , fireEvent} from '@testing-library/react/';
import { Input } from "../../../src/app/challenge-dashboard/_components"


describe('test', () => {
    it("hello", async()=>{
      const { getByTestId } = render(<Input/>)
      const field  = getByTestId('search-text-field').querySelector('input')
      expect(field).toBeDefined()
  
      fireEvent.change(field! ,{target: { value: 'some text'}});
      expect(field?.value).toBe('some text');
    })
}); 