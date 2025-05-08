import React from 'react';
import { render, screen } from '@testing-library/react';
import { CreatePostApartment } from '@/app/create-post/_components/CreatePostApartment';
import '@testing-library/jest-dom';

describe('CreatePostLocation', () => {
  test('should renders header and description with correct text and classes', () => {
    render(<CreatePostApartment />);

    const infoElement = screen.getByTestId('Apartment');
    expect(infoElement).toBeInTheDocument();
    expect(infoElement).toHaveTextContent('Барилгын дэлгэрэнгүй');
    expect(infoElement).toHaveClass('text-[#09090B]', 'text-lg');

    const descElement = screen.getByTestId('Desc');
    expect(descElement).toBeInTheDocument();
    expect(descElement).toHaveTextContent(/Please tell us the name of the guest staying at the hotel/i);
    expect(descElement).toHaveClass('text-[#71717A]', 'text-sm');
  });
});