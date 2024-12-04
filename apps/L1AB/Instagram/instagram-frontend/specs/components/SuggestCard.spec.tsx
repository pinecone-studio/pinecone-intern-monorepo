import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SuggestCard } from '@/components/SuggestCard';
import { useCreateFollowersMutation } from '@/generated';
jest.mock('@/generated', () => ({
  useCreateFollowersMutation: jest.fn(),
}));
describe('SuggestCard', () => {
  it('sould render successfully', async () => {
    const mockCreateFollowers = jest.fn().mockResolvedValue({
      data: { createFollowers: { id: 'new-follower-id', followeeId: 'some-id' } },
    });

    useCreateFollowersMutation.mockReturnValue([mockCreateFollowers]);
    render(<SuggestCard />);
  });
});
