import React from 'react';
import { render, screen } from '@testing-library/react';
import { HistoryBar } from '../../src/app/profile/_components/HistoryBar';
import '@testing-library/jest-dom';

describe('HistoryBar component', () => {
  test('renders component with data', () => {
    const data = {
      studentEmail: 'example@example.com',
      challengeId: '123456',
      challengeTitle: 'Test Challenge',
      experiencePoint: 100,
      startedAt: new Date('2024-01-01'),
      endAt: new Date('2024-01-10'),
      _typename: 'Challenge',
      _id: '789012',
    };

    render(<HistoryBar data={data} />);

    expect(screen.getByText('Test Challenge')).toBeInTheDocument();
    expect(screen.getByText('Авсан оноо: 100')).toBeInTheDocument();
    expect(screen.getByText('2024.01.10')).toBeInTheDocument();
  });

  test('renders component with no data', () => {
    const data = null;

    render(<HistoryBar data={data} />);

    expect(screen.queryByText('Test Challenge')).toBeNull();
    expect(screen.queryByText('Авсан оноо: 100')).toBeNull();
    expect(screen.queryByText('2024.01.10')).toBeNull();
  });

  test('renders component with missing date', () => {
    const data = {
      challengeTitle: 'Test Challenge',
      _typename: 'Challenge',
      _id: '789012',
    };

    render(<HistoryBar data={data} />);

    expect(screen.getByText('Test Challenge')).toBeInTheDocument();
    expect(screen.getByText(/Авсан оноо/)).toBeInTheDocument();
    expect(screen.queryByText('N/A')).not.toBeInTheDocument();
  });
});
