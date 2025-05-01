import React from 'react';
import { render, screen } from '@testing-library/react';
import { CreatePostHeader } from '@/app/create-post/_components/CreatePostHeader';
import '@testing-library/jest-dom';



describe('CreatePostHeader', () => {
  test('renders header and description with correct text and classes', () => {
    render(<CreatePostHeader/>);

    const infoElement = screen.getByTestId('Info');
    expect(infoElement).toBeInTheDocument();
    expect(infoElement).toHaveTextContent('Ерөнхий мэдээлэл');
    expect(infoElement).toHaveClass('text-[#09090B]', 'text-lg');

    const descElement = screen.getByTestId('Desc');
    expect(descElement).toBeInTheDocument();
    expect(descElement).toHaveTextContent(/Please tell us the name of the guest staying at the hotel/i);
    expect(descElement).toHaveClass('text-[#71717A]', 'text-sm');
  });
});
