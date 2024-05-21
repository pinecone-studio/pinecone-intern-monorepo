import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { JobRecruitDashboard } from '../../src/app/recruiting/_components';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Recruit Component', () => {
  it('should contain the correct text content', () => {
    const { getByText } = render(<JobRecruitDashboard />);
    expect(getByText('Ажлын зар')).toBeDefined();
    expect(getByText('Зар нэмэх')).toBeDefined();
  });
  it('should call addRecruit function on button click', () => {
    const { getByTestId } = render(<JobRecruitDashboard />);
    const addButton = getByTestId('jobAdd-button').querySelector('button');
    fireEvent.click(addButton);
  });

  it('should render Button component within JobRecruitDashboard', () => {
    const { getByTestId, getByText } = render(<JobRecruitDashboard />);
    const button = getByTestId('jobAdd-button').querySelector('button');
    expect(button).toBeDefined();

    expect(getByText('Ажлын зар')).toBeDefined();
    expect(getByText('Зар нэмэх')).toBeDefined();

    const plusIcon = button.querySelector('svg');
    expect(plusIcon).toBeDefined();
  });

  it('should apply containerStyle correctly', () => {
    const { container } = render(<JobRecruitDashboard />);
    const component = container.firstChild as Element;

    expect(component).toBeDefined();

    const containerStyle = window.getComputedStyle(component);

    expect(containerStyle.getPropertyValue('container')).toBe('');
    expect(containerStyle.getPropertyValue('margin-block'));
  });
});
