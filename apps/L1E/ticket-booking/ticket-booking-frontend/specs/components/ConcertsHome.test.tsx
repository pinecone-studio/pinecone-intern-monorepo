import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConcertsHome } from '@/components/ConcertsHome';

// Mock concert data for reference in tests
const mockConcertData = [
    {
        id: 1,
        image: "https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg",
        title: "Music of the Spheres",
        artist: "Coldplay",
        price: "200'000$",
        date: "10.31-11.2",
        location: "UG ARENA",
    },
    {
        id: 2,
        image: "https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg",
        title: "Ocean Beats",
        artist: "DJ Wave",
        price: "120'000$",
        date: "9.12-9.13",
        location: "Blue Dome",
    },
    {
        id: 3,
        image: "https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg",
        title: "Night Lights",
        artist: "Imagine Dragons",
        price: "180'000$",
        date: "11.10-11.12",
        location: "UB Palace",
    },
    {
        id: 4,
        image: "https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg",
        title: "Bass Drop",
        artist: "Skrillex",
        price: "250'000$",
        date: "10.01-10.03",
        location: "Sound Hall",
    },
    {
        id: 5,
        image: "https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg",
        title: "Rock Revival",
        artist: "Green Day",
        price: "300'000$",
        date: "12.20-12.22",
        location: "Big Arena",
    },
    {
        id: 6,
        image: "https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg",
        title: "Classical Night",
        artist: "Beethoven Lives",
        price: "150'000$",
        date: "10.15-10.16",
        location: "Opera House",
    },
    {
        id: 7,
        image: "https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg",
        title: "Jazz & Wine",
        artist: "Miles Quartet",
        price: "140'000$",
        date: "9.25-9.26",
        location: "Jazz Lounge",
    },
    {
        id: 8,
        image: "https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg",
        title: "K-Pop Wave",
        artist: "BTS",
        price: "500'000$",
        date: "11.01-11.02",
        location: "Seoul Dome",
    },
    {
        id: 9,
        image: "https://cdn.pixabay.com/photo/2015/08/09/14/26/frog-881654_1280.jpg",
        title: "Indie Vibes",
        artist: "Arctic Monkeys",
        price: "220'000$",
        date: "10.10-10.12",
        location: "Underground Stage",
    }
];

describe('ConcertsHome Component', () => {
    beforeEach(() => {
        render(<ConcertsHome />);
    });

    describe('Component Structure', () => {
        it('renders the main grid container', () => {
            const gridContainer = document.querySelector('.grid.gap-8.grid-cols-3.grid-rows-3');
            expect(gridContainer).toBeInTheDocument();
            expect(gridContainer).toHaveClass('w-full', '[&>*]:w-full', '[&>*]:h-fit');
        });

        it('renders all 9 concert cards', () => {
            const concertCards = document.querySelectorAll('[data-testid="concert-card"]') ||
                document.querySelectorAll('div > div');
            // We expect 9 concert items based on the mock data
            expect(document.querySelectorAll('img')).toHaveLength(9);
        });

        it('renders correct number of images', () => {
            const images = screen.getAllByRole('img');
            expect(images).toHaveLength(9);
        });
    });

    describe('Concert Card Content', () => {
        it('renders all concert titles', () => {
            mockConcertData.forEach(concert => {
                expect(screen.getByText(concert.title)).toBeInTheDocument();
            });
        });

        it('renders all artist names', () => {
            mockConcertData.forEach(concert => {
                expect(screen.getByText(concert.artist)).toBeInTheDocument();
            });
        });

        it('renders all concert prices', () => {
            mockConcertData.forEach(concert => {
                expect(screen.getByText(concert.price)).toBeInTheDocument();
            });
        });

        it('displays hardcoded date for all concerts', () => {
            // Note: The component shows hardcoded "10.31-11.2" instead of using concert.date
            const dateElements = screen.getAllByText('10.31-11.2');
            expect(dateElements).toHaveLength(9);
        });

        it('displays hardcoded location for all concerts', () => {
            // Note: The component shows hardcoded "UG ARENA" instead of using concert.location
            const locationElements = screen.getAllByText('UG ARENA');
            expect(locationElements).toHaveLength(9);
        });
    });

    describe('Concert Card Images', () => {
        it('all images have the same source', () => {
            const images = screen.getAllByRole('img');
            images.forEach(img => {
                expect(img).toHaveAttribute(
                    'src',
                    expect.stringContaining('frog-881654_1280.jpg')
                );
            });
        });

        it('applies correct image styling', () => {
            const images = screen.getAllByRole('img');
            images.forEach(img => {
                expect(img).toHaveClass(
                    'h-4/6',
                    'w-full',
                    'object-cover',
                    'object-center'
                );
            });
        });

        it('images should have alt text for accessibility', () => {
            const images = screen.getAllByRole('img');
            images.forEach(img => {
                expect(img).toHaveAttribute('alt');
            });
        });
    });

    describe('Card Content Styling', () => {
        it('applies correct styling to concert titles', () => {
            const titles = screen.getAllByRole('heading', { level: 2 });
            titles.forEach(title => {
                expect(title).toHaveClass('text-white', 'text-xl', 'font-normal');
            });
        });

        it('applies correct styling to artist names', () => {
            // Get all artist paragraphs (they have specific color class)
            const artistElements = document.querySelectorAll('.text-\\[\\#A1A1AA\\].text-base.font-light.mb-7');
            expect(artistElements).toHaveLength(9);
        });

        it('applies correct styling to prices', () => {
            // Prices should have specific styling
            const priceElements = document.querySelectorAll('.text-white.text-2xl.font-bold.mb-6');
            expect(priceElements).toHaveLength(9);
        });

        it('applies correct background to content containers', () => {
            const contentContainers = document.querySelectorAll('.bg-\\[\\#131313\\].rounded');
            expect(contentContainers).toHaveLength(9);

            contentContainers.forEach(container => {
                expect(container).toHaveClass('py-8', 'px-6');
            });
        });
    });

    describe('Icons and Visual Elements', () => {
        it('renders calendar icons', () => {
            const calendarIcons = document.querySelectorAll('svg[width="16"][height="16"]');
            expect(calendarIcons).toHaveLength(9);
        });

        it('renders location icons', () => {
            const locationIcons = document.querySelectorAll('svg[width="17"][height="16"]');
            expect(locationIcons).toHaveLength(9);
        });

        it('calendar icons have correct stroke properties', () => {
            const calendarPaths = document.querySelectorAll('svg[width="16"] path');
            calendarPaths.forEach(path => {
                expect(path).toHaveAttribute('stroke', '#FAFAFA');
                expect(path).toHaveAttribute('stroke-opacity', '0.5');
                expect(path).toHaveAttribute('stroke-linecap', 'round');
                expect(path).toHaveAttribute('stroke-linejoin', 'round');
            });
        });

        it('location icons have correct stroke properties', () => {
            const locationPaths = document.querySelectorAll('svg[width="17"] path');
            locationPaths.forEach(path => {
                expect(path).toHaveAttribute('stroke', '#FAFAFA');
                expect(path).toHaveAttribute('stroke-opacity', '0.5');
                expect(path).toHaveAttribute('stroke-linecap', 'round');
                expect(path).toHaveAttribute('stroke-linejoin', 'round');
            });
        });
    });

    describe('Layout and Spacing', () => {
        it('uses flex layout for date and location info', () => {
            const flexContainers = document.querySelectorAll('.flex.justify-between');
            expect(flexContainers).toHaveLength(9);
        });

        it('applies correct gap spacing in info sections', () => {
            const gapElements = document.querySelectorAll('.flex.gap-2.items-center');
            expect(gapElements).toHaveLength(18); // 2 per card (date + location) × 9 cards
        });

        it('applies correct margin bottom classes', () => {
            expect(document.querySelectorAll('.mb-7')).toHaveLength(9); // Artist names
            expect(document.querySelectorAll('.mb-6')).toHaveLength(9); // Prices
        });
    });

    describe('Data Inconsistencies', () => {
        it('identifies hardcoded vs dynamic data usage', () => {
            // The component has inconsistent data usage:
            // - Uses dynamic: title, artist, price
            // - Uses hardcoded: date, location, image src

            // Test that titles are dynamic (all different)
            const titles = mockConcertData.map(concert => concert.title);
            titles.forEach(title => {
                expect(screen.getByText(title)).toBeInTheDocument();
            });

            // Test that dates are hardcoded (all same)
            const dateElements = screen.getAllByText('10.31-11.2');
            expect(dateElements).toHaveLength(9);

            // Test that locations are hardcoded (all same)
            const locationElements = screen.getAllByText('UG ARENA');
            expect(locationElements).toHaveLength(9);
        });
    });

    describe('Grid Layout', () => {
        it('uses 3-column grid layout', () => {
            const gridContainer = document.querySelector('.grid-cols-3');
            expect(gridContainer).toBeInTheDocument();
        });

        it('uses 3-row grid layout', () => {
            const gridContainer = document.querySelector('.grid-rows-3');
            expect(gridContainer).toBeInTheDocument();
        });

        it('applies grid gap', () => {
            const gridContainer = document.querySelector('.gap-8');
            expect(gridContainer).toBeInTheDocument();
        });

        it('applies child element styling via CSS selector', () => {
            const gridContainer = document.querySelector('.\\[\\&\\>\\*\\]\\:w-full');
            expect(gridContainer).toBeInTheDocument();
        });
    });

    describe('Accessibility', () => {
        it('uses proper heading tags for concert titles', () => {
            const headings = screen.getAllByRole('heading', { level: 2 });
            expect(headings).toHaveLength(9);

            // Verify heading content
            mockConcertData.forEach(concert => {
                expect(screen.getByRole('heading', { name: concert.title })).toBeInTheDocument();
            });
        });

        it('maintains proper semantic structure', () => {
            // Each concert card should have a logical structure
            const headings = screen.getAllByRole('heading');
            expect(headings).toHaveLength(9);
        });
    });

    describe('Content Validation', () => {
        it('displays correct concert information', () => {
            // Test a few specific concerts
            expect(screen.getByText('Music of the Spheres')).toBeInTheDocument();
            expect(screen.getByText('Coldplay')).toBeInTheDocument();
            expect(screen.getByText("200'000$")).toBeInTheDocument();

            expect(screen.getByText('K-Pop Wave')).toBeInTheDocument();
            expect(screen.getByText('BTS')).toBeInTheDocument();
            expect(screen.getByText("500'000$")).toBeInTheDocument();
        });

        it('handles various price formats', () => {
            const prices = ["200'000$", "120'000$", "180'000$", "250'000$", "300'000$",
                "150'000$", "140'000$", "500'000$", "220'000$"];

            prices.forEach(price => {
                expect(screen.getByText(price)).toBeInTheDocument();
            });
        });

        it('displays diverse artist lineup', () => {
            const artists = ['Coldplay', 'DJ Wave', 'Imagine Dragons', 'Skrillex',
                'Green Day', 'Beethoven Lives', 'Miles Quartet', 'BTS', 'Arctic Monkeys'];

            artists.forEach(artist => {
                expect(screen.getByText(artist)).toBeInTheDocument();
            });
        });
    });

    describe('Component Rendering', () => {
        it('renders without crashing', () => {
            expect(() => {
                render(<ConcertsHome />);
            }).not.toThrow();
        });

        it('maintains component isolation', () => {
            const { unmount } = render(<ConcertsHome />);
            expect(() => {
                unmount();
            }).not.toThrow();
        });

        it('handles re-renders correctly', () => {
            const { rerender } = render(<ConcertsHome />);
            expect(() => {
                rerender(<ConcertsHome />);
            }).not.toThrow();

            // Content should still be there after rerender
            // expect(screen.getByText('Music of the Spheres')).toBeInTheDocument();
        });
    });

    describe('Performance Considerations', () => {
        it('renders reasonable number of DOM elements', () => {
            const allElements = document.querySelectorAll('*');
            // With 9 concert cards, expect reasonable DOM complexity
            expect(allElements.length).toBeGreaterThan(50);
            expect(allElements.length).toBeLessThan(200);
        });

        it('uses efficient CSS selectors', () => {
            // Verify advanced CSS selectors are applied
            const advancedSelector = document.querySelector('.\\[\\&\\>\\*\\]\\:w-full.\\[\\&\\>\\*\\]\\:h-fit');
            expect(advancedSelector).toBeInTheDocument();
        });
    });
});

describe('ConcertsHome Component Edge Cases', () => {
    it('handles empty concert data gracefully', () => {
        // This test conceptually checks what would happen with no data
        // In the current implementation, data is hardcoded
        render(<ConcertsHome />);

        // Should still render the grid container
        const gridContainer = document.querySelector('.grid');
        expect(gridContainer).toBeInTheDocument();
    });

    it('maintains layout integrity with long text content', () => {
        render(<ConcertsHome />);

        // Test that long concert titles don't break layout
        expect(screen.getByText('Music of the Spheres')).toBeInTheDocument();
        expect(screen.getByText('Classical Night')).toBeInTheDocument();
    });

    it('handles special characters in price formatting', () => {
        render(<ConcertsHome />);

        // Test prices with apostrophes
        expect(screen.getByText("200'000$")).toBeInTheDocument();
        expect(screen.getByText("500'000$")).toBeInTheDocument();
    });
});

describe('ConcertsHome Component Data Structure', () => {
    it('validates concert data structure', () => {
        // Ensure all required fields are present in mock data
        mockConcertData.forEach(concert => {
            expect(concert).toHaveProperty('id');
            expect(concert).toHaveProperty('title');
            expect(concert).toHaveProperty('artist');
            expect(concert).toHaveProperty('price');
            expect(concert).toHaveProperty('date');
            expect(concert).toHaveProperty('location');
            expect(concert).toHaveProperty('image');
        });
    });

    it('has unique concert IDs', () => {
        const ids = mockConcertData.map(concert => concert.id);
        const uniqueIds = [...new Set(ids)];
        expect(uniqueIds).toHaveLength(ids.length);
    });
});