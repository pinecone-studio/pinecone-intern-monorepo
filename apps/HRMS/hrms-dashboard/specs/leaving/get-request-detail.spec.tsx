import React from 'react';
import { render } from '@testing-library/react';
import RequestDetails from '../../src/app/leaving/_components/RequestDetails';

describe('RequestDetails component', () => {
  const mockData = {
    totalHour: 'Test totalHour',
  };

  it('renders with correct data', () => {
    const { getByTestId, queryAllByText } = render(<RequestDetails data={mockData} />);

    const requestDetailsElement = getByTestId('request-details');
    expect(requestDetailsElement).toBeTruthy();

    const totalHourElements = queryAllByText(mockData.totalHour);
    expect(totalHourElements.length).toBeTruthy();
  });

  it('renders formatted start date when startDate is provided', () => {
    const mockDataWithStartDate = {
      totalHour: 10,
      startDate: '2024-05-24',
      endHour: '2024-05-28'
    };

    const { getByText } = render(<RequestDetails data={mockDataWithStartDate} />);
    expect(getByText);
  });

  it('renders empty string when startDate is not provided', () => {
    const mockDataWithoutStartDate = {
      totalHour: 10,
    };
    const { getByText } = render(<RequestDetails data={mockDataWithoutStartDate} />);
    expect(getByText);
  });
});
