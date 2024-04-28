import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import  SectionInputForm  from "../../src/app/section/_components/SectionInputForm"

describe('SectionInputForm Component' , () => {

    it('Should take correct props' , () => {
        const { getByTestId } = render(<SectionInputForm label = "Хичээлийн гарчиг" helperText = "Хичээлийн гарчиг оруулна уу..."/> )

        const title = getByTestId('label');

        const notif = getByTestId('helperText');

        expect(title.textContent).toMatch('Хичээлийн гарчиг');
        expect(notif.textContent).toMatch('Хичээлийн гарчиг оруулна уу...');
    })
   
})