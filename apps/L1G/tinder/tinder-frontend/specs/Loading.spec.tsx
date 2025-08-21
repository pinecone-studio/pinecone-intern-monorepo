import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from '../src/components/Loading';

describe('Loading Component', () => {
  test('renders Tinder logo and text', () => {
    render(<Loading />);

    const tinderText = screen.getByText('tinder');
    expect(tinderText).toBeInTheDocument();
    expect(tinderText).toHaveClass('text-3xl', 'font-bold', 'tracking-tight', 'text-[#424242]');
  });

  test('renders "Please Wait..." text', () => {
    render(<Loading />);

    const waitText = screen.getByText('Please Wait...');
    expect(waitText).toBeInTheDocument();
    expect(waitText).toHaveClass('text-sm', 'text-gray-400');
  });

  test('renders copyright text', () => {
    render(<Loading />);

    const copyrightText = screen.getByText('©2024 Tinder');
    expect(copyrightText).toBeInTheDocument();
    expect(copyrightText).toHaveClass('text-xs', 'text-gray-400');
  });

  test('has correct layout structure', () => {
    render(<Loading />);

    const mainContainer = screen.getByText('tinder').closest('div').parentElement.parentElement.parentElement;
    expect(mainContainer).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center', 'h-screen', 'bg-white');
  });

  test('renders loading spinner with correct styling', () => {
    render(<Loading />);

    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-8', 'h-8', 'border-4', 'border-gray-200', 'rounded-full', 'border-t-pink-500', 'animate-spin');
  });

  test('flame icon has correct props', () => {
    render(<Loading />);

    const flameContainer = screen.getByText('tinder').previousElementSibling;
    expect(flameContainer).toHaveClass('mr-2');
  });

  test('has correct component structure', () => {
    render(<Loading />);

    expect(screen.getByText('tinder')).toBeInTheDocument();
    expect(screen.getByText('Please Wait...')).toBeInTheDocument();
    expect(screen.getByText('©2024 Tinder')).toBeInTheDocument();
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  test('loading spinner is animated', () => {
    render(<Loading />);

    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toHaveClass('animate-spin');
  });

  test('footer is positioned correctly', () => {
    render(<Loading />);

    const footer = screen.getByText('©2024 Tinder').parentElement;
    expect(footer).toHaveClass('pb-8');
  });

  test('main content area uses flex-1', () => {
    render(<Loading />);

    const mainContent = screen.getByText('Please Wait...').closest('.flex-1');
    expect(mainContent).toHaveClass('flex-1');
  });
});
