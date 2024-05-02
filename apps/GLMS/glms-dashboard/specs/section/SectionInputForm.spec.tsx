import React from 'react';
import { render } from '@testing-library/react';
import SectionInputForm from "../../src/app/section/_components/SectionInputForm";

describe('SectionInputForm Component', () => {

    test('Should take correct props', () => {

        const { getByTestId } = render(
            <SectionInputForm label="Хичээлийн гарчиг" helperText="Хичээлийн гарчиг оруулна уу..." />
        );

        const label = getByTestId('label');
        const helperText = getByTestId('helperText');

        expect(label.textContent).toMatch('Хичээлийн гарчиг');
        expect(helperText.textContent).toMatch('Хичээлийн гарчиг оруулна уу...');
    })
   
})
