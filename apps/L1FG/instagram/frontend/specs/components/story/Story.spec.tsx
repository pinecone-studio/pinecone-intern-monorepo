import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Story from '@/components/story/Story';

describe('Story Component', () => {
  const mockStories = [
    {
      id: 1,
      username: 'user1',
      time: '10m',
      gradient: 'from-purple-500 to-pink-500',
      views: '100 views',
    },
    {
      id: 2,
      username: 'user2',
      time: '20m',
      gradient: 'from-blue-500 to-green-500',
      views: '200 views',
    },
  ];

  it('should render the component correctly', () => {
    render(<Story stories={mockStories} />);

    // Компонентын үндсэн элементүүдийг шалгах
    expect(screen.getByTestId('story-container')).toBeInTheDocument();
    expect(screen.getByTestId('story-header')).toBeInTheDocument();
    expect(screen.getByTestId('story-title')).toHaveTextContent('Instagram');
  });

  it('should render the first story by default', () => {
    render(<Story stories={mockStories} />);

    expect(screen.getByTestId('story-username')).toHaveTextContent('user1');
    expect(screen.getByTestId('story-time')).toHaveTextContent('10m');
    expect(screen.getByTestId('story-views')).toHaveTextContent('100 views');
  });

  it('should navigate to the next story when "Next" button is clicked', () => {
    render(<Story stories={mockStories} />);

    const nextButton = screen.getByTestId('next-button');
    fireEvent.click(nextButton);

    // Дараагийн түүхийн өгөгдлийг шалгах
    expect(screen.getByTestId('story-username')).toHaveTextContent('user2');
    expect(screen.getByTestId('story-time')).toHaveTextContent('20m');
    expect(screen.getByTestId('story-views')).toHaveTextContent('200 views');

    const prevButton = screen.getByTestId('previous-button');

    // Өмнөх түүх рүү буцах
    fireEvent.click(prevButton);

    expect(screen.getByTestId('story-username')).toHaveTextContent('user1');
    expect(screen.getByTestId('story-time')).toHaveTextContent('10m');
    expect(screen.getByTestId('story-views')).toHaveTextContent('100 views');
  });


});
