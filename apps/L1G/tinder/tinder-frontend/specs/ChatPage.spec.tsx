import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatPage from '../src/components/ChatPage';
import '@testing-library/jest-dom';

jest.mock('@/components/ChatPerson', () => {
  const Component = ({ selectedUser, onUserSelect, bottomUsers, chattedUsers }) => (
    <div data-testid="chat-person">
      <div data-testid="selected-user">{selectedUser?.name}</div>
      <div>Bottom: {bottomUsers.length}</div>
      <div>Chatted: {chattedUsers.size}</div>
      {bottomUsers.map((u) => (
        <button key={u.id} onClick={() => onUserSelect(u)} data-testid={`bottom-${u.id}`}>
          {u.name}
        </button>
      ))}
    </div>
  );
  Component.displayName = 'MockChatPerson';
  return Component;
});

jest.mock('@/components/ChatWindow', () => {
  const Component = ({ selectedUser, messages, inputValue, onInputChange, onKeyDown, onSend }) => (
    <div data-testid="chat-window">
      <div>Chat with: {selectedUser?.name}</div>
      <div data-testid="messages-count">Messages: {messages.length}</div>
      <input data-testid="chat-input" value={inputValue} onChange={onInputChange} onKeyDown={onKeyDown} />
      <button onClick={onSend} data-testid="send-button">
        Send
      </button>
    </div>
  );
  Component.displayName = 'MockChatWindow';
  return Component;
});

jest.mock('@/components/Matches', () => {
  const Component = ({ topRowUsers, selectedUser, onUserSelect }) => (
    <div data-testid="matches">
      <div>Top: {topRowUsers.length}</div>
      <div data-testid="selected-match">Selected: {selectedUser?.name}</div>
      {topRowUsers.map((u) => (
        <button key={u.id} onClick={() => onUserSelect(u)} data-testid={`top-${u.id}`}>
          {u.name}
        </button>
      ))}
    </div>
  );
  Component.displayName = 'MockMatches';
  return Component;
});

describe('ChatPage - core behaviors', () => {
  beforeEach(() => jest.spyOn(Date, 'now').mockReturnValue(1234567890));
  afterEach(() => jest.restoreAllMocks());

  test('renders UI and selects Esther Howard initially', () => {
    render(<ChatPage />);
    expect(screen.getByTestId('matches')).toBeInTheDocument();
    expect(screen.getByTestId('chat-window')).toBeInTheDocument();
    expect(screen.getByTestId('selected-user')).toHaveTextContent('Esther Howard');
  });

  test('user selection from top and bottom rows', async () => {
    const user = userEvent.setup();
    render(<ChatPage />);

    await user.click(screen.getByTestId('top-1'));
    expect(screen.getByText('Chat with: Leslie Alexander')).toBeInTheDocument();
    expect(screen.getByText('Messages: 0')).toBeInTheDocument();

    await user.click(screen.getByTestId('bottom-8'));
    expect(screen.getByText('Chat with: Bessie Cooper')).toBeInTheDocument();
  });

  test('message sending via button and Enter key', async () => {
    const user = userEvent.setup();
    render(<ChatPage />);
    const input = screen.getByTestId('chat-input');

    await user.type(input, 'Hi!');
    await user.click(screen.getByTestId('send-button'));
    expect(screen.getByText('Messages: 5')).toBeInTheDocument();
    expect(input).toHaveValue('');

    await user.type(input, 'Hello{enter}');
    expect(screen.getByText('Messages: 6')).toBeInTheDocument();
  });

  test('message validation and trimming', async () => {
    const user = userEvent.setup();
    render(<ChatPage />);
    const input = screen.getByTestId('chat-input');

    await user.click(screen.getByTestId('send-button'));
    expect(screen.getByText('Messages: 4')).toBeInTheDocument();

    await user.type(input, '   ');
    await user.click(screen.getByTestId('send-button'));
    expect(input).toHaveValue('   ');

    await user.clear(input);
    await user.type(input, '  Hello!  ');
    await user.click(screen.getByTestId('send-button'));
    expect(input).toHaveValue('');
  });

  test('user movement and chat tracking', async () => {
    const user = userEvent.setup();
    render(<ChatPage />);

    await user.click(screen.getByTestId('top-1'));
    expect(screen.getByText('Bottom: 2')).toBeInTheDocument();

    await user.type(screen.getByTestId('chat-input'), 'Hello!');
    await user.click(screen.getByTestId('send-button'));
    expect(screen.getByText('Bottom: 3')).toBeInTheDocument();
    expect(screen.getByText('Chatted: 1')).toBeInTheDocument();
  });

  test('special cases and edge conditions', async () => {
    const user = userEvent.setup();

    const customMatches = [{ id: 10, name: 'Custom User', age: 30, job: 'Designer', avatar: ['/custom.jpg'] }];
    const { unmount } = render(<ChatPage matches={customMatches} />);
    expect(screen.getByTestId('selected-user')).toHaveTextContent('Custom User');
    unmount();

    render(<ChatPage matches={[]} />);
    fireEvent.click(screen.getByTestId('send-button'));
    expect(screen.getByTestId('chat-window')).toBeInTheDocument();

    const input = screen.getByTestId('chat-input');
    await user.type(input, 'Line1');
    await user.keyboard('{Shift>}{Enter}{/Shift}');
    expect(input).toHaveValue('Line1');
  });
});
