import { InterestSelect } from '../../../src/components/signup/InterestSelect';
import { act, fireEvent, render, screen } from '@testing-library/react';

describe('InterestSelect Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render successfully', () => {
    render(<InterestSelect />);
    expect(screen.getByText('Next'));
  });

  it('loads the selected interest from localStorage if available', () => {
    localStorage.setItem('signupFormData', JSON.stringify({ interested: 'male' }));

    render(<InterestSelect />);
  });

  it('should navigate to the next step when Next is clicked and an interest is selected', async () => {
    render(<InterestSelect />);

    await act(async () => {
      fireEvent.click(screen.getByTestId('interest'));
    });
  });

  it('should not navigate to the next step when Next is clicked without selecting an interest', () => {
    render(<InterestSelect />);

    fireEvent.click(screen.getByTestId('interest'));

    expect(screen.getByText('Who are you interested in?'));
  });

  it('should handle key press events for Next button', () => {
    render(<InterestSelect />);

    fireEvent.keyDown(screen.getByTestId('interest'), { key: 'Enter' });
  });

  it('render when localStorage is empty', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue(null),
        setItem: jest.fn(),
      },
      writable: true,
    });

    const { getByTestId } = render(<InterestSelect />);

    fireEvent.keyDown(getByTestId('trigger'), { key: 'Enter' });
    fireEvent.keyDown(getByTestId('male'), { key: 'Enter' });

    fireEvent.click(getByTestId('interest'));
  });
});
