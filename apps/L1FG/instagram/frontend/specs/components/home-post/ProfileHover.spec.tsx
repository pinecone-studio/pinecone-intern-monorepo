import { ProfileHover } from '@/components/home-post/ProfileHover';
import { GetProfilePreviewDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import { previewProfileMockData, previewProfileMockDataFollowingTrue } from './mock';
import userEvent from '@testing-library/user-event';
const mock1 = {
  request: {
    query: GetProfilePreviewDocument,
    variables: {
      searchingUserId: '12',
    },
  },
  result: previewProfileMockData,
};
const mock2 = {
  request: {
    query: GetProfilePreviewDocument,
    variables: {
      searchingUserId: '12',
    },
  },
  result: previewProfileMockDataFollowingTrue,
};
describe('Profile hover', () => {
  it('Should render', async () => {
    const user = userEvent.setup();
    render(
      <MockedProvider mocks={[mock1]} addTypename={false}>
        <ProfileHover searchingUserId="12">
          <div>hi</div>
        </ProfileHover>
      </MockedProvider>
    );
    const triggerButton = screen.getByTestId('profile-hover-button');
    expect(triggerButton).toBeDefined();
    await user.hover(triggerButton);
  });
  it('Should render following', async () => {
    const user = userEvent.setup();
    render(
      <MockedProvider mocks={[mock2]} addTypename={false}>
        <ProfileHover searchingUserId="12">
          <div>hi</div>
        </ProfileHover>
      </MockedProvider>
    );
    const triggerButton = screen.getByTestId('profile-hover-button');
    expect(triggerButton).toBeDefined();
    await user.hover(triggerButton);
  });
});
