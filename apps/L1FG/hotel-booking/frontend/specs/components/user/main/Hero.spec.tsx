import { Hero } from '@/components/user/main/Hero';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Hero', () => {
  it('should render Hero successfully', async () => {
    render(<Hero />);
  });
});
