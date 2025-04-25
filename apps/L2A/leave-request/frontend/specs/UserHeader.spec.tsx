import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserHeader from '@/app/user/_components/UserHeader';


describe('UserHeader component', () => {
  beforeEach(() => {
    render(<UserHeader/>);
  });

  it('Should render My request button', () => {
    const myRequestBtn = screen.getByTestId('My-request');
    expect(myRequestBtn).toBeInTheDocument();
    expect(myRequestBtn).toBeVisible();
    expect(myRequestBtn).toHaveTextContent('My request');
  });

  it('Should render Request Form button', () => {
    const requestFormBtn = screen.getByTestId('Request-Form');
    expect(requestFormBtn).toBeInTheDocument();
    expect(requestFormBtn).toBeVisible();
    expect(requestFormBtn).toHaveTextContent('Request Form');
  });

  it('Should render Leave Calendar button', () => {
    const leaveCalendarBtn = screen.getByTestId('Leave-Calendar');
    expect(leaveCalendarBtn).toBeInTheDocument();
    expect(leaveCalendarBtn).toBeVisible();
    expect(leaveCalendarBtn).toHaveTextContent('Leave Calendar');
  });
});
