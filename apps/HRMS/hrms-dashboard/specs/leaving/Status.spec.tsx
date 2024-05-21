import React from 'react';
import { render } from '@testing-library/react';
import Status from '../../src/app/leaving/_components/Status';

describe('Status component', () => {
  it('renders correctly with approved status', () => {
    const data = { status: 'approved' };
    const { getByText } = render(<Status dat={data} />);
    const typographyElement = getByText('Зөвшөөрсөн');
    expect(typographyElement).toBeTruthy();
  });

  it('renders correctly with declined status', () => {
    const data = { status: 'declined' };
    const { getByText } = render(<Status dat={data} />);
    const typographyElement = getByText('Татгалзсан');
    expect(typographyElement).toBeTruthy();
  });

  it('renders correctly with pending status', () => {
    const data = { status: 'pending' };
    const { getByText } = render(<Status dat={data} />);
    const typographyElement = getByText('Шинэ хүсэлт');
    expect(typographyElement).toBeTruthy();
  });
  it('renders correctly with unknown status', () => {
    const data = { status: 'unknown' };
    const { getByText } = render(<Status dat={data} />);
    expect(getByText).toBeTruthy();
  });
});
