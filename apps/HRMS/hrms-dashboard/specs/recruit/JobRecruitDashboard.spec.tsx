import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { JobRecruitDashboard } from '../../src/app/recruiting/_components';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
useRouter.mockImplementation(() => ({
  push: mockPush,
}));

jest.mock('../../src/generated', () => ({
  useGetJobsQuery: () => ({
    data: {
      getJobs: [
        {
          title: 'Developer',
          dueDate: '1629888000000',
          createdAt: '1629206400000',
          status: 'Open',
        },
      ],
    },
    loading: false,
  }),
}));

describe('JobRecruitDashboard Component', () => {
  it('should render recruit components', () => {
    const { container, getByText } = render(<JobRecruitDashboard />);
    expect(container).toBeDefined();

    const firstButton = getByText('Зар');
    const secondButton = getByText('Ирсэн өргөдөл');
    expect(firstButton).toBeDefined();
    expect(secondButton).toBeDefined();
  });

  it('should contain the correct text content', () => {
    const { getByText } = render(<JobRecruitDashboard />);
    expect(getByText('Ажлын зар')).toBeDefined();
    expect(getByText('Зар нэмэх')).toBeDefined();
  });

  it('should call addRecruit function on button click', () => {
    const { getByTestId } = render(<JobRecruitDashboard />);
    const addButton = getByTestId('jobAdd-button').querySelector('button');
    fireEvent.click(addButton);
    expect(mockPush).toHaveBeenCalledWith('/recruiting/add-job');
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

  it('should switch tables when buttons are clicked', () => {
    const { getByTestId } = render(<JobRecruitDashboard />);

    const jobsButton = getByTestId('jobs-button');
    const applicantsButton = getByTestId('applicants-button');

    fireEvent.click(jobsButton);
    expect(getByTestId('jobs-table')).toBeDefined();
    expect(() => getByTestId('applications-table')).toThrow();

    fireEvent.click(applicantsButton);
    expect(getByTestId('applications-table')).toBeDefined();
    expect(() => getByTestId('jobs-table')).toThrow();
  });

  it('should render JobsListTable when selected is jobs', () => {
    const { getByTestId } = render(<JobRecruitDashboard />);
    expect(getByTestId('jobs-table')).toBeDefined();
  });

  it('should render ApplicantsListTable when selected is applicants', () => {
    const { getByTestId } = render(<JobRecruitDashboard />);
    const applicantsButton = getByTestId('applicants-button');
    fireEvent.click(applicantsButton);
    expect(getByTestId('applications-table')).toBeDefined();
  });

  it('should navigate to add job page when add button is clicked', () => {
    const { getByTestId } = render(<JobRecruitDashboard />);
    const addButton = getByTestId('jobAdd-button').querySelector('button');
    fireEvent.click(addButton);
    expect(mockPush).toHaveBeenCalledWith('/recruiting/add-job');
  });

  it('should apply correct styles to the container', () => {
    const { container } = render(<JobRecruitDashboard />);
    const component = container.firstChild as HTMLElement;
    expect(component).toBeDefined();
    const containerStyle = window.getComputedStyle(component.firstChild as HTMLElement);
    expect(containerStyle.paddingInline).toBe('24px');
    expect(containerStyle.paddingTop).toBe('16px');
  });
});
