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
});
