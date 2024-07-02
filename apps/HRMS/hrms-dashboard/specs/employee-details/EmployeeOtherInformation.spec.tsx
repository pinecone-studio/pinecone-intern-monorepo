import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmployeesOtherInformation } from '../../src/app/employee-details/_components/employee-other-information/EmployeesOtherInformation';

describe('Check render other info', () => {
    it("Should render other info", ()=>{
        render(<EmployeesOtherInformation />);
        expect(screen.getByTestId('otherInfo')).toBeInTheDocument();
    })

})