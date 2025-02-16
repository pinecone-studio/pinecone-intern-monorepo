import HomePageProfile from '@/components/home/right/HomeProfile';
import { GetFollowingSuggestionDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { previewGetFollowingSuggestion } from 'specs/components/home-post/mock';
const mock1 = {
  request: {
    query: GetFollowingSuggestionDocument,
  },
  result: previewGetFollowingSuggestion,
};
describe('HomePageProfile', () => {
  it('Should render', () => {
    render(
      <MockedProvider mocks={[mock1]}>
        <HomePageProfile />
      </MockedProvider>
    );
  });
});
