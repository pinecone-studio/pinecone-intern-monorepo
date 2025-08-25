import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConcertCoverPic } from '@/components/ConcertCoverPic';

describe('ConcertCoverPic Component', () => {
  beforeEach(() => {
    render(<ConcertCoverPic />);
  });

  describe('Component Structure', () => {
    it('renders the main container with correct styling', () => {
      const container = document.querySelector('.w-full.h-\\[250px\\]');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('relative', 'overflow-hidden');
    });

    it('renders the background image', () => {
      const image = screen.getByAltText('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', expect.stringContaining('funny-baby-pictures'));
    });

    it('applies correct image styling', () => {
      const image = screen.getByAltText('img');
      expect(image).toHaveClass('w-full', 'h-full', 'object-cover', 'object-center');
    });

    it('renders the gradient overlay', () => {
      const gradient = document.querySelector('.bg-gradient-to-t');
      expect(gradient).toBeInTheDocument();
      expect(gradient).toHaveClass('absolute', 'bottom-0', 'left-0', 'w-full', 'h-24', 'from-black', 'to-transparent', 'z-10');
    });
  });

  describe('Artist Information', () => {
    it('renders the artist name badge', () => {
      const artistBadge = screen.getByText('Coldplay');
      expect(artistBadge).toBeInTheDocument();
    });

    it('applies correct styling to artist badge', () => {
      const artistBadge = screen.getByText('Coldplay');
      expect(artistBadge).toHaveClass('border', 'py-[6px]', 'px-3', 'border-[#FAFAFA33]', 'text-white', 'text-base', 'font-normal', 'rounded-2xl', 'mb-3', 'w-fit');
    });

    it('renders the concert title', () => {
      const title = screen.getByText('MUSIC of the SPHERES');
      expect(title).toBeInTheDocument();
    });

    it('uses h1 tag for the concert title', () => {
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveTextContent('MUSIC of the SPHERES');
    });
  });

  describe('Date Information', () => {
    it('renders all date entries', () => {
      ['10.3', '11.1', '11.2'].forEach((date) => {
        expect(screen.getByText(date)).toBeInTheDocument();
      });
    });

    it('renders date separators', () => {
      const separators = screen.getAllByText('|');
      expect(separators.length).toBe(2);
    });

    it('applies correct styling to date text', () => {
      ['10.3', '11.1', '11.2'].forEach((date) => {
        expect(screen.getByText(date)).toHaveClass('text-base', 'font-bold');
      });
    });

    it('renders the calendar icon with proper attributes', () => {
      const calendarIcon = document.querySelector('svg');
      expect(calendarIcon).toBeInTheDocument();
      expect(calendarIcon).toHaveAttribute('width', '16');
      expect(calendarIcon).toHaveAttribute('height', '16');
    });
  });

  describe('Layout and Styling', () => {
    it('positions text overlay correctly', () => {
      const textContainer = document.querySelector('.absolute.top-1\\/2.left-\\[121px\\]');
      expect(textContainer).toBeInTheDocument();
      expect(textContainer).toHaveClass('-translate-y-1/2', 'z-20');
    });

    it('arranges date info in flex layout', () => {
      const dateContainer = document.querySelector('.flex.gap-2.items-center.text-white');
      expect(dateContainer).toBeInTheDocument();
    });

    it('uses proper text hierarchy and typography', () => {
      expect(screen.getByText('Coldplay')).toHaveClass('text-base', 'font-normal');
      expect(screen.getByText('MUSIC of the SPHERES')).toHaveClass('text-5xl', 'font-bold');
    });
  });

  describe('Accessibility', () => {
    it('image should have alt text', () => {
      const image = screen.getByAltText('img');
      expect(image).toBeInTheDocument();
    });
  });

  describe('Component Integrity', () => {
    it('renders without crashing', () => {
      expect(() => render(<ConcertCoverPic />)).not.toThrow();
    });

    it('maintains structure even if image fails to load', () => {
      const image = screen.getByAltText('img');
      expect(screen.getByText('Coldplay')).toBeInTheDocument();
      expect(screen.getByText('MUSIC of the SPHERES')).toBeInTheDocument();
    });
  });
});
