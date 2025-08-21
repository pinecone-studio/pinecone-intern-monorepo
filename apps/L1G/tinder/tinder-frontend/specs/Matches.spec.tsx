import { Matches } from '@/components/Matches';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

function getExpectedAgeByName(name) {
  switch (name) {
    case 'Mark Zuckerberg':
      return '40';
    case 'Eleanor Pena':
    case 'Wade Warren':
    case 'Wade Warren ahahjad ajdjajka askjdh':
      return '32';
    default:
      return null;
  }
}

function includesText(textToFind) {
  return (content) => content.includes(textToFind);
}

function checkUserCardContent(img) {
  const userName = img.getAttribute('alt');
  expect(userName).toBeTruthy();

  const userCard = img.closest('div.flex.flex-col');
  expect(userCard).toBeInTheDocument();

  if (!userCard || !userName) return;

  const { getByText, queryByText } = within(userCard);

  expect(getByText(includesText(userName))).toBeInTheDocument();

  const expectedAge = getExpectedAgeByName(userName);
  if (expectedAge) {
    expect(queryByText(includesText(expectedAge))).toBeInTheDocument();
  }
}

describe('Matches', () => {
  it('renders correctly', () => {
    render(<Matches />);

    const avatars = screen.getAllByRole('img');
    expect(avatars).toHaveLength(5);

    avatars.forEach(checkUserCardContent);

    expect(screen.getByText('Matches')).toBeInTheDocument();
    expect(screen.getAllByText('Software Engineer')).toHaveLength(5);
  });

  it('renders correct number of matches', () => {
    render(<Matches />);
    expect(screen.getAllByRole('img')).toHaveLength(5);
  });

  it('displays user information correctly', () => {
    render(<Matches />);
    const names = ['Mark Zuckerberg', 'Eleanor Pena', 'Wade Warren', 'Wade Warren ahahjad ajdjajka askjdh'];

    names.forEach((name) => {
      const userImages = screen.getAllByAltText(name);
      expect(userImages.length).toBeGreaterThan(0);

      userImages.forEach((userImage) => {
        const userCard = userImage.closest('div.flex.flex-col');
        expect(userCard).toBeInTheDocument();

        if (!userCard) return;

        const { getByText } = within(userCard);
        expect(getByText(includesText(name))).toBeInTheDocument();
      });
    });
  });
});
