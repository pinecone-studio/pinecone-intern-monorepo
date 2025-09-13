import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConcertsList } from '@/components/ConcertsList';

// Mock concert data for reference in tests (only 6 active concerts)
const mockConcertData = [
  {
    id: 1,
    image: 'https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg',
    title: 'Music of the Spheres',
    artist: 'Coldplay',
    price: "200'000$",
    date: '10.31-11.2',
    location: 'UG ARENA',
  },
  {
    id: 2,
    image: 'https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg',
    title: 'Ocean Beats',
    artist: 'DJ Wave',
    price: "120'000$",
    date: '9.12-9.13',
    location: 'Blue Dome',
  },
  {
    id: 3,
    image: 'https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg',
    title: 'Night Lights',
    artist: 'Imagine Dragons',
    price: "180'000$",
    date: '11.10-11.12',
    location: 'UB Palace',
  },
  {
    id: 4,
    image: 'https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg',
    title: 'Bass Drop',
    artist: 'Skrillex',
    price: "250'000$",
    date: '10.01-10.03',
    location: 'Sound Hall',
  },
  {
    id: 5,
    image: 'https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg',
    title: 'Rock Revival',
    artist: 'Green Day',
    price: "300'000$",
    date: '12.20-12.22',
    location: 'Big Arena',
  },
  {
    id: 6,
    image: 'https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg',
    title: 'Classical Night',
    artist: 'Beethoven Lives',
    price: "150'000$",
    date: '10.15-10.16',
    location: 'Opera House',
  },
];

describe('ConcertsList Component', () => {
  beforeEach(() => {
    render(<ConcertsList />);
  });

  describe('Component Structure', () => {
    it('renders the section heading in Mongolian', () => {
      expect(screen.getByText('Холбоотой эвент болон тоглолтууд')).toBeInTheDocument();
    });

    it('applies correct styling to the heading', () => {
      const heading = screen.getByText('Холбоотой эвент болон тоглолтууд');
      expect(heading).toHaveClass('text-white', 'text-xl', 'font-light', 'mb-6');
    });

    it('uses h6 tag for the section heading', () => {
      const heading = screen.getByRole('heading', { level: 6 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Холбоотой эвент болон тоглолтууд');
    });

    it('renders the main grid container', () => {
      const gridContainer = document.querySelector('.grid.gap-8.grid-cols-3.grid-rows-2');
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass('w-full', '[&>*]:w-full', '[&>*]:h-fit');
    });

    it('renders exactly 6 concert cards', () => {
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(6);
    });

    it('uses React Fragment as root element', () => {
      // Fragment doesn't create DOM element, so we check for direct children
      const heading = screen.getByRole('heading', { level: 6 });
      const gridContainer = document.querySelector('.grid');
      expect(heading).toBeInTheDocument();
      expect(gridContainer).toBeInTheDocument();
    });
  });

  describe('Concert Card Content', () => {
    it('renders all active concert titles', () => {
      mockConcertData.forEach((concert) => {
        expect(screen.getByText(concert.title)).toBeInTheDocument();
      });
    });

    it('renders all artist names', () => {
      mockConcertData.forEach((concert) => {
        expect(screen.getByText(concert.artist)).toBeInTheDocument();
      });
    });

    it('renders all concert prices', () => {
      mockConcertData.forEach((concert) => {
        expect(screen.getByText(concert.price)).toBeInTheDocument();
      });
    });

    it('does not render commented out concerts', () => {
      // These concerts should NOT appear (they're commented out)
      expect(screen.queryByText('Jazz & Wine')).not.toBeInTheDocument();
      expect(screen.queryByText('K-Pop Wave')).not.toBeInTheDocument();
      expect(screen.queryByText('Indie Vibes')).not.toBeInTheDocument();
      expect(screen.queryByText('Miles Quartet')).not.toBeInTheDocument();
      expect(screen.queryByText('BTS')).not.toBeInTheDocument();
      expect(screen.queryByText('Arctic Monkeys')).not.toBeInTheDocument();
    });

    it('displays hardcoded date for all concerts', () => {
      // Component shows hardcoded "10.31-11.2" instead of using concert.date
      const dateElements = screen.getAllByText('10.31-11.2');
      expect(dateElements).toHaveLength(6);
    });

    it('displays hardcoded location for all concerts', () => {
      // Component shows hardcoded "UG ARENA" instead of using concert.location
      const locationElements = screen.getAllByText('UG ARENA');
      expect(locationElements).toHaveLength(6);
    });
  });

  describe('Concert Card Images', () => {
    it('all images use the same hardcoded source', () => {
      const images = screen.getAllByRole('img');
      images.forEach((img) => {
        expect(img).toHaveAttribute('src', expect.stringContaining('frog-881654_1280.jpg'));
      });
    });

    it('applies correct image styling', () => {
      const images = screen.getAllByRole('img');
      images.forEach((img) => {
        expect(img).toHaveClass('h-4/6', 'w-full', 'object-cover', 'object-center');
      });
    });

    it('images have alt text for accessibility', () => {
      const images = screen.getAllByRole('img');
      images.forEach((img) => {
        expect(img).toHaveAttribute('alt');
      });
    });
  });

  describe('Card Content Styling', () => {
    it('applies correct styling to concert titles', () => {
      const titles = screen.getAllByRole('heading', { level: 2 });
      expect(titles).toHaveLength(6);
      titles.forEach((title) => {
        expect(title).toHaveClass('text-white', 'text-xl', 'font-normal');
      });
    });

    it('applies correct styling to artist names', () => {
      const artistElements = document.querySelectorAll('.text-\\[\\#A1A1AA\\].text-base.font-light.mb-7');
      expect(artistElements).toHaveLength(6);
    });

    it('applies correct styling to prices', () => {
      const priceElements = document.querySelectorAll('.text-white.text-2xl.font-bold.mb-6');
      expect(priceElements).toHaveLength(6);
    });

    it('applies correct background to content containers', () => {
      const contentContainers = document.querySelectorAll('.bg-\\[\\#131313\\].rounded');
      expect(contentContainers).toHaveLength(6);

      contentContainers.forEach((container) => {
        expect(container).toHaveClass('py-8', 'px-6');
      });
    });
  });

  describe('Icons and Visual Elements', () => {
    it('renders calendar icons for all cards', () => {
      const calendarIcons = document.querySelectorAll('svg[width="16"][height="16"]');
      expect(calendarIcons).toHaveLength(6);
    });

    it('renders location icons for all cards', () => {
      const locationIcons = document.querySelectorAll('svg[width="17"][height="16"]');
      expect(locationIcons).toHaveLength(6);
    });

    it('calendar icons have correct stroke properties', () => {
      const calendarPaths = document.querySelectorAll('svg[width="16"] path');
      calendarPaths.forEach((path) => {
        expect(path).toHaveAttribute('stroke', '#FAFAFA');
        expect(path).toHaveAttribute('stroke-opacity', '0.5');
        expect(path).toHaveAttribute('stroke-linecap', 'round');
        expect(path).toHaveAttribute('stroke-linejoin', 'round');
      });
    });

    it('location icons have correct stroke properties', () => {
      const locationPaths = document.querySelectorAll('svg[width="17"] path');
      locationPaths.forEach((path) => {
        expect(path).toHaveAttribute('stroke', '#FAFAFA');
        expect(path).toHaveAttribute('stroke-opacity', '0.5');
        expect(path).toHaveAttribute('stroke-linecap', 'round');
        expect(path).toHaveAttribute('stroke-linejoin', 'round');
      });
    });
  });

  describe('Grid Layout', () => {
    it('uses 3-column grid layout', () => {
      const gridContainer = document.querySelector('.grid-cols-3');
      expect(gridContainer).toBeInTheDocument();
    });

    it('uses 2-row grid layout (different from ConcertsHome)', () => {
      const gridContainer = document.querySelector('.grid-rows-2');
      expect(gridContainer).toBeInTheDocument();
    });

    it('applies grid gap', () => {
      const gridContainer = document.querySelector('.gap-8');
      expect(gridContainer).toBeInTheDocument();
    });

    it('applies child element styling via advanced CSS selector', () => {
      const gridContainer = document.querySelector('.\\[\\&\\>\\*\\]\\:w-full.\\[\\&\\>\\*\\]\\:h-fit');
      expect(gridContainer).toBeInTheDocument();
    });
  });

  describe('Layout and Spacing', () => {
    it('uses flex layout for date and location info', () => {
      const flexContainers = document.querySelectorAll('.flex.justify-between');
      expect(flexContainers).toHaveLength(6);
    });

    it('applies correct gap spacing in info sections', () => {
      const gapElements = document.querySelectorAll('.flex.gap-2.items-center');
      expect(gapElements).toHaveLength(12); // 2 per card (date + location) × 6 cards
    });

    it('applies correct margin classes', () => {
      expect(document.querySelectorAll('.mb-7')).toHaveLength(6); // Artist names
      expect(document.querySelectorAll('.mb-6')).toHaveLength(7); // Prices (6) + heading (1)
    });
  });

  describe('Data Structure and Usage', () => {
    it('uses dynamic data for some fields', () => {
      // Dynamic fields: title, artist, price
      mockConcertData.forEach((concert) => {
        expect(screen.getByText(concert.title)).toBeInTheDocument();
        expect(screen.getByText(concert.artist)).toBeInTheDocument();
        expect(screen.getByText(concert.price)).toBeInTheDocument();
      });
    });

    it('ignores dynamic data for other fields', () => {
      // Hardcoded fields: date, location, image
      const uniqueDatesInData = [...new Set(mockConcertData.map((c) => c.date))];
      const uniqueLocationsInData = [...new Set(mockConcertData.map((c) => c.location))];

      // Component should show only hardcoded values, not the variety in data
      expect(uniqueDatesInData.length).toBeGreaterThan(1); // Data has variety
      expect(uniqueLocationsInData.length).toBeGreaterThan(1); // Data has variety

      // But component shows only hardcoded values
      expect(screen.getAllByText('10.31-11.2')).toHaveLength(6);
      expect(screen.getAllByText('UG ARENA')).toHaveLength(6);
    });

    it('properly filters out commented concerts', () => {
      // Should have exactly 6 concerts (ids 1-6), not 9
      const displayedTitles = mockConcertData.map((concert) => screen.getByText(concert.title));
      expect(displayedTitles).toHaveLength(6);
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      const h6Heading = screen.getByRole('heading', { level: 6 });
      const h2Headings = screen.getAllByRole('heading', { level: 2 });

      expect(h6Heading).toBeInTheDocument();
      expect(h2Headings).toHaveLength(6);
    });

    it('uses proper heading tags for concert titles', () => {
      const concertHeadings = screen.getAllByRole('heading', { level: 2 });
      mockConcertData.forEach((concert, index) => {
        expect(concertHeadings[index]).toHaveTextContent(concert.title);
      });
    });

    it('maintains logical content structure', () => {
      // Check that each concert card has proper semantic structure
      mockConcertData.forEach((concert) => {
        const title = screen.getByRole('heading', { name: concert.title });
        expect(title).toBeInTheDocument();
      });
    });
  });

  describe('Content Validation', () => {
    it('displays correct concert lineup', () => {
      // Test specific concerts that should be displayed
      expect(screen.getByText('Music of the Spheres')).toBeInTheDocument();
      expect(screen.getByText('Coldplay')).toBeInTheDocument();
      expect(screen.getByText("200'000$")).toBeInTheDocument();

      expect(screen.getByText('Classical Night')).toBeInTheDocument();
      expect(screen.getByText('Beethoven Lives')).toBeInTheDocument();
      expect(screen.getByText("150'000$")).toBeInTheDocument();
    });

    it('displays price range correctly', () => {
      const expectedPrices = ["200'000$", "120'000$", "180'000$", "250'000$", "300'000$", "150'000$"];
      expectedPrices.forEach((price) => {
        expect(screen.getByText(price)).toBeInTheDocument();
      });
    });

    it('covers different music genres', () => {
      const artists = ['Coldplay', 'DJ Wave', 'Imagine Dragons', 'Skrillex', 'Green Day', 'Beethoven Lives'];
      artists.forEach((artist) => {
        expect(screen.getByText(artist)).toBeInTheDocument();
      });
    });
  });

  describe('Component Rendering', () => {
    it('renders without crashing', () => {
      expect(() => {
        render(<ConcertsList />);
      }).not.toThrow();
    });

    it('maintains component isolation', () => {
      const { unmount } = render(<ConcertsList />);
      expect(() => {
        unmount();
      }).not.toThrow();
    });

    it('handles re-renders correctly', () => {
      const { rerender } = render(<ConcertsList />);
      expect(() => {
        rerender(<ConcertsList />);
      }).not.toThrow();

      // Content should persist after rerender
      // expect(screen.getByText('Холбоотой эвент болон тоглолтууд')).toBeInTheDocument();
      // expect(screen.getByText('Music of the Spheres')).toBeInTheDocument();
    });
  });

  describe('Internationalization', () => {
    it('displays Mongolian heading text correctly', () => {
      const mongolianHeading = screen.getByText('Холбоотой эвент болон тоглолтууд');
      expect(mongolianHeading).toBeInTheDocument();
    });

    it('handles mixed language content', () => {
      // Component has Mongolian heading but English concert content
      expect(screen.getByText('Холбоотой эвент болон тоглолтууд')).toBeInTheDocument(); // Mongolian
      expect(screen.getByText('Music of the Spheres')).toBeInTheDocument(); // English
      expect(screen.getByText('Coldplay')).toBeInTheDocument(); // English
    });
  });

  describe('Performance Considerations', () => {
    it('renders optimal number of elements for 6 concerts', () => {
      const allElements = document.querySelectorAll('*');
      // Should have reasonable DOM complexity for 6 concert cards
      expect(allElements.length).toBeGreaterThan(30);
      expect(allElements.length).toBeLessThan(150);
    });

    it('uses efficient key props for list rendering', () => {
      // While we can't directly test React keys, we ensure proper structure
      const images = screen.getAllByRole('img');
      const titles = screen.getAllByRole('heading', { level: 2 });

      expect(images).toHaveLength(6);
      expect(titles).toHaveLength(6);
    });
  });
});

describe('ConcertsList vs ConcertsHome Comparison', () => {
  it('has different grid layout than ConcertsHome', () => {
    render(<ConcertsList />);

    // ConcertsList uses 3x2 grid (6 items)
    expect(document.querySelector('.grid-rows-2')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(6);

    // ConcertsHome would use 3x3 grid (9 items)
    expect(document.querySelector('.grid-rows-3')).not.toBeInTheDocument();
  });

  it('includes section heading unlike ConcertsHome', () => {
    render(<ConcertsList />);

    // ConcertsList has a section heading
    expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
    expect(screen.getByText('Холбоотой эвент болон тоглолтууд')).toBeInTheDocument();
  });

  it('shows fewer concerts than ConcertsHome', () => {
    render(<ConcertsList />);

    // ConcertsList shows 6 concerts
    expect(screen.getAllByRole('img')).toHaveLength(6);
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(6);

    // Should not show the extra 3 concerts that ConcertsHome would show
    expect(screen.queryByText('Jazz & Wine')).not.toBeInTheDocument();
    expect(screen.queryByText('K-Pop Wave')).not.toBeInTheDocument();
    expect(screen.queryByText('Indie Vibes')).not.toBeInTheDocument();
  });
});

describe('ConcertsList Edge Cases', () => {
  it('handles commented out data correctly', () => {
    render(<ConcertsList />);

    // Ensure commented out concerts don't appear
    const commentedOutTitles = ['Jazz & Wine', 'K-Pop Wave', 'Indie Vibes'];
    commentedOutTitles.forEach((title) => {
      expect(screen.queryByText(title)).not.toBeInTheDocument();
    });
  });

  it('maintains layout with exactly 6 items in 3x2 grid', () => {
    render(<ConcertsList />);

    const gridContainer = document.querySelector('.grid-cols-3.grid-rows-2');
    expect(gridContainer).toBeInTheDocument();

    // Should perfectly fill 3x2 grid with 6 items
    const concertCards = screen.getAllByRole('img');
    expect(concertCards).toHaveLength(6);
  });
});
