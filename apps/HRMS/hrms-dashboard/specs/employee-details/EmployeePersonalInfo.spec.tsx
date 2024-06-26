import React from 'react';
import { EmployeePersonalInfo } from '../../src/app/employee-details/employee-detail/_components/EmployeePersonalinfo';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
describe('EmployeePersonalinfo', () => {
  test('render employee personal info', () => {
    render(<EmployeePersonalInfo />);

    const PersonalInfo = screen.getByTestId('PersonalInfo');
    expect(PersonalInfo).toHaveTextContent('Хувийн мэдээлэл');

    const Image = screen.getByTestId('Img');
    expect(Image).toBeInTheDocument();

    const Name = screen.getByTestId('Name');
    expect(Name).toHaveTextContent('М.Ганбат');

    const Job = screen.getByTestId('job');
    expect(Job).toHaveTextContent('UX/UI Дизайнер');

    const Call = screen.getByTestId('Call');
    expect(Call).toHaveTextContent('+97680556021');

    const Email = screen.getByTestId('Email');
    expect(Email).toHaveTextContent('Zoloosoko0526@gmail.com');

    const Location = screen.getByTestId('Location');
    expect(Location).toHaveTextContent('Ulaanbaatar ,Mongolia');
  });
});
