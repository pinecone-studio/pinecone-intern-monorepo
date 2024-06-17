// Header.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProjectHeader } from '../../src/app/employee-details/_components/header/ProjectHeader';
import '@testing-library/jest-dom';

describe('Header', () => {
  it('Should render Header', () => {
    render(<ProjectHeader />);
    expect(screen.getByTestId('Header')).toBeInTheDocument();
  });
});
