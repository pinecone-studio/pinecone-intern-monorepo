import React from 'react';
import DashBoardArticleDetail from '../../src/app/dashboard/_components/DashboardTableDetail';
import { render } from '@testing-library/react';
describe('DashBoardArticleDetail component', () => {
  const props = {
    rate: 10,
    comment: 5,
    share: 3,
  };

  it('renders with correct props and structure', () => {
    const { getByTestId, getByText } = render(<DashBoardArticleDetail {...props} />);

    expect(getByTestId('dashboard-article-detail')).toBeInTheDocument();
    expect(getByTestId('dashboard-article-detail')).toHaveStyle('width: 100%');
    expect(getByTestId('dashboard-article-detail')).toHaveStyle('background-color: #F7F7F8');
    expect(getByTestId('dashboard-article-detail')).toHaveStyle('height: 44px');
    expect(getByTestId('dashboard-article-detail')).toHaveStyle('justify-content: center');

    expect(getByText('Таалагдсан')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
    expect(getByText('Сэтгэгдлүүд')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
    expect(getByText('Хуваалцсан')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();

    expect(getByTestId('rate')).toBeInTheDocument();
    expect(getByTestId('comment')).toBeInTheDocument();
    expect(getByTestId('share')).toBeInTheDocument();
  });

  it('contains a close icon', () => {
    const { getByTestId } = render(<DashBoardArticleDetail {...props} />);

    expect(getByTestId('close-icon')).toBeInTheDocument();
  });
});
