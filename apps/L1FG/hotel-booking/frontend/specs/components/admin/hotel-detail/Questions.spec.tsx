import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Questions } from '@/components/admin/hotel-detail';
import '@testing-library/jest-dom';

// Mock data for the Hotel type, including missing properties
const mockHotelData = {
  id: '1',
  name: 'Test Hotel',
  images: ['image1.jpg', 'image2.jpg'],
  faqs: [
    { key: 'What is the check-in time?', value: 'The check-in time is from 3 PM.' },
    { key: 'Is there parking available?', value: 'Yes, there is free parking.' },
    { key: 'Can I bring pets?', value: 'Pets are not allowed on the property.' },
  ],
};

describe('Questions component', () => {
  test('renders the FAQ header and edit button', () => {
    render(<Questions data={mockHotelData} />);

    // Check if FAQ header is rendered
    expect(screen.getByText(/Frequently asked questions/i)).toBeInTheDocument();

    // Check if the edit button is rendered
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
  });

  test('renders FAQ questions and answers', async () => {
    render(<Questions data={mockHotelData} />);

    // Check if all FAQs are rendered correctly
    mockHotelData.faqs.forEach((faq) => {
      // Ensure the question is visible
      expect(screen.getByText(faq.key)).toBeInTheDocument();

      // Simulate a click to open the accordion
      const accordionTrigger = screen.getByText(faq.key);
      fireEvent.click(accordionTrigger);

      // Wait for the content to appear
      waitFor(() => {
        // Check if the corresponding answer is visible after the click
        expect(screen.getByText(faq.value)).toBeInTheDocument();
      });
    });
  });

  test('accordion triggers and content toggle correctly', async () => {
    render(<Questions data={mockHotelData} />);

    // Check if all FAQs' triggers are visible
    mockHotelData.faqs.forEach((faq) => {
      const accordionTrigger = screen.getByText(faq.key);
      expect(accordionTrigger).toBeInTheDocument();

      // Initially, the content should not be visible
      expect(screen.queryByText(faq.value)).not.toBeInTheDocument();

      // Simulate clicking the accordion trigger to open content
      fireEvent.click(accordionTrigger);

      // Wait for the content to appear after the click
      waitFor(() => {
        expect(screen.getByText(faq.value)).toBeInTheDocument();
      });

      // Ensure that clicking again will hide the content
      fireEvent.click(accordionTrigger);

      // After the second click, content should not be visible
      expect(screen.queryByText(faq.value)).not.toBeInTheDocument();
    });
  });
});
