/* eslint-disable */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GetPostsDocument } from '@/generated';
import { HomePageLatest } from '@/components/HomePage/HomePageLatest';

// Mock the MainCard component
jest.mock('@/features/card', () => ({
  MainCard: ({ value }: { value: any }) => <div data-testid="main-card">{value.title}</div>,
}));

// Mock Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="next-link">
      {children}
    </a>
  );
});

const mockPosts = [
  {
    _id: '1',
    title: 'Test Post 1',
    description: 'Description 1',
    price: 1000,
    location: 'Location 1',
  },
  {
    _id: '2',
    title: 'Test Post 2',
    description: 'Description 2',
    price: 2000,
    location: 'Location 2',
  },
];

describe('HomePageLatest', () => {
  it('should render loading state', () => {
    render(
      <MockedProvider mocks={[]}>
        <HomePageLatest />
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render error state', async () => {
    const errorMocks = [
      {
        request: {
          query: GetPostsDocument,
        },
        error: new Error('Test error message'),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks}>
        <HomePageLatest />
      </MockedProvider>
    );

    // Wait for and verify error message
    const errorElement = await screen.findByTestId('error-message');
    expect(errorElement).toHaveTextContent('Error loading posts: Test error message');
  });

  it('should render posts successfully', async () => {
    const mocks = [
      {
        request: {
          query: GetPostsDocument,
        },
        result: {
          data: {
            getPosts: mockPosts,
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <HomePageLatest />
      </MockedProvider>
    );

    // Check heading
    const heading = await screen.findByText('Сүүлд орсон зарууд');
    expect(heading).toBeInTheDocument();

    // Check "View More" link
    const viewMoreLink = await screen.findByTestId('next-link');
    expect(viewMoreLink).toHaveAttribute('href', '/estates');
    expect(viewMoreLink).toHaveTextContent('Цааш үзэх');

    // Check posts
    const cards = await screen.findAllByTestId('main-card');
    expect(cards).toHaveLength(2);

    // Verify post content
    mockPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });
});
