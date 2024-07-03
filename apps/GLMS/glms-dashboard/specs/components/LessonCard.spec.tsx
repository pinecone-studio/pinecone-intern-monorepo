import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LessonCard } from '../../src/components/LessonCard';

describe('LessonCard', () => {
  const props = {
    customKey: 'lesson1',
    title: 'Introduction to React',
    href: '/lessons/react-intro',
    id: '1',
  };

  it('renders the lesson card with provided title and href', () => {
    render(<LessonCard {...props} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', props.href);
    expect(screen.getByText(props.title)).toBeInTheDocument();
  });

  it('has the correct styling classes', () => {
    render(<LessonCard {...props} />);
    const divElement = screen.getByText(props.title).closest('div');
    expect(divElement).toHaveClass('bg-gray-50', 'rounded-[12px]', 'hover:bg-gray-100', 'border-[1px]', 'border-gray-300', 'flex', 'w-custom', 'px-8', 'py-6', 'items-center', 'gap-4');
  });

  it('has the correct styling classes', () => {
    render(<LessonCard {...props} />);
    const divElement = screen.getByText(props.title).closest('div');
    expect(divElement).toHaveClass('bg-gray-50', 'rounded-[12px]', 'hover:bg-gray-100', 'border-[1px]', 'border-gray-300', 'flex', 'w-custom', 'px-8', 'py-6', 'items-center', 'gap-4');
  });
});
