import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SuggestCard } from '@/components/SuggestCard';
import { MockedProvider } from '@apollo/client/testing';

describe('SuggestCard', () => {
  it('should render successfully', async () => {
    render(
      <MockedProvider>
        <SuggestCard />
      </MockedProvider>
    );
  });
});
