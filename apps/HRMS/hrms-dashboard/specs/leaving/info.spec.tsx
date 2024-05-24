import React from 'react';
import { render } from '@testing-library/react';
import Info from '../../src/app/leaving/_components/Info';

describe('DetailInfo component', () => {
  const testData = {
    name: 'test',
    declinedReasoning: 'Test declined reasoning',
  };

  it('renders correctly', () => {
    const { getByText } = render(<Info data={testData} />);

    expect(getByText('Нэр')).toBeTruthy();
    expect(getByText(testData.name)).toBeTruthy();
    expect(getByText('Шалтгаан')).toBeTruthy();
    expect(getByText(testData.declinedReasoning)).toBeTruthy();
  });
});
