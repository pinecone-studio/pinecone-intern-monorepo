import React from 'react';
import DashBoardArticleDetail from '../../../cms-dashboard/src/app/dashboard/_components/DashboardTableDetail';
import { render } from '@testing-library/react';
describe('DashBoardArticleDetail component', () => {
  const props = {
    rate: 10,
    comment: 5,
    share: 3,
  };

  it('renders with correct props and structure', () => {
    const { getByTestId, getByText } = render(<DashBoardArticleDetail {...props} />);

    expect(getByTestId('dashboard-article-detail')).toBeDefined();

    expect(getByText('Таалагдсан')).toBeDefined();
    expect(getByText('10')).toBeDefined();
    expect(getByText('Сэтгэгдлүүд')).toBeDefined();
    expect(getByText('5')).toBeDefined();
    expect(getByText('Хуваалцсан')).toBeDefined();
    expect(getByText('3')).toBeDefined();

    expect(getByTestId('rate')).toBeDefined();
    expect(getByTestId('comment')).toBeDefined();
    expect(getByTestId('share')).toBeDefined();
  });

  it('contains a close icon', () => {
    const { getByTestId } = render(<DashBoardArticleDetail {...props} />);

    expect(getByTestId('close-icon')).toBeDefined();
  });
});
