// // ChatPage.test.tsx
// import React from 'react';
// import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { useGetMeQuery, useGetChatWithUserLazyQuery } from '@/generated';
// import { useMessageSending } from 'hooks/useMessageSending';
// import { useSocketConnection } from 'hooks/useSocketConnection';
// import { useUserManagement } from 'hooks/useUserManagement';
// import { useMarkMessagesAsSeen } from 'hooks/useMarkMessagesAsSeen';
// import { useMobileDetection } from 'hooks/useMobileDetection';
// import { usePageVisibility } from 'hooks/usePageVisibility';
// import { useConversationsLoader } from 'hooks/useConversationsLoader';
// import { useSelectedChatLoader } from 'hooks/useSelectedChatLoader';
// import { useNotifications } from 'hooks/useNotifications';
// import { useAutoMarkMessagesAsSeen } from 'hooks/useAutoMarkMessageAsSeen';
// import ChatPage from '@/components/ChatPage';

// // Mock all hooks
// jest.mock('@/generated');
// jest.mock('hooks/useMessageSending');
// jest.mock('hooks/useSocketConnection');
// jest.mock('hooks/useUserManagement');
// jest.mock('hooks/useMarkMessagesAsSeen');
// jest.mock('hooks/useMobileDetection');
// jest.mock('hooks/usePageVisibility');
// jest.mock('hooks/useConversationsLoader');
// jest.mock('hooks/useSelectedChatLoader');
// jest.mock('hooks/useNotifications');
// jest.mock('hooks/useAutoMarkMessageAsSeen');

// jest.mock('../src/components/ChatPerson', () => ({
//   __esModule: true,
//   default: jest.fn(({ selectedUser, onUserSelect }) => (
//     <div data-testid="chat-person">
//       <button onClick={() => onUserSelect({ id: 'test-user' })}>Select User</button>
//       {selectedUser && <div>Selected: {selectedUser.id}</div>}
//     </div>
//   )),
// }));

// jest.mock('../src/components/ChatWindow', () => ({
//   // Adjust path
//   __esModule: true,
//   default: jest.fn(({ selectedUser, onBack, onSend, inputValue, onInputChange }) => (
//     <div data-testid="chat-window">
//       {selectedUser && <div>Chat with: {selectedUser.id}</div>}
//       <input data-testid="message-input" value={inputValue} onChange={(e) => onInputChange(e.target as any)} />
//       <button onClick={() => onSend(inputValue, () => {})}>Send</button>
//       <button onClick={onBack}>Back</button>
//     </div>
//   )),
// }));

// jest.mock('../src/components/Matches', () => ({
//   // Adjust path
//   __esModule: true,
//   default: jest.fn(({ selectedUser, onUserSelect }) => (
//     <div data-testid="matches">
//       <button onClick={() => onUserSelect({ id: 'test-match' })}>Select Match</button>
//       {selectedUser && <div>Selected Match: {selectedUser.id}</div>}
//     </div>
//   )),
// }));

// jest.mock('../src/components/Loading', () => ({
//   // Adjust path
//   __esModule: true,
//   default: ({ msg }: { msg: string }) => <div data-testid="loading">{msg}</div>,
// }));

// describe('ChatPage Component', () => {
//   const mockRefetch = jest.fn();
//   const mockFetchChat = jest.fn();
//   const mockSetConversations = jest.fn();
//   const mockSetChatLoading = jest.fn();
//   const mockSetNotifications = jest.fn();
//   const mockHandleUserSelect = jest.fn();
//   const mockHandleNotification = jest.fn();
//   const mockDismissNotification = jest.fn();
//   const mockMarkMessagesAsSeen = jest.fn();
//   const mockAutoMarkNewMessagesAsSeen = jest.fn();
//   const mockHandleSend = jest.fn();
//   const mockHandleInputChange = jest.fn();
//   const mockHandleUnmatched = jest.fn();
//   const mockHandleNewMatch = jest.fn();
//   const mockMoveUserToBottom = jest.fn();
//   const mockSetChattedUsers = jest.fn();
//   const mockSetSocketError = jest.fn();
//   const mockSetUserStatuses = jest.fn();
//   const mockSetTypingUsers = jest.fn();

//   beforeEach(() => {
//     // Reset all mocks
//     jest.clearAllMocks();

//     // Setup mock implementations
//     (useGetMeQuery as jest.Mock).mockReturnValue({
//       data: {
//         getMe: {
//           id: 'user123',
//           matchIds: [
//             { id: 'match1', matchedUser: { id: 'user1' } },
//             { id: 'match2', matchedUser: { id: 'user2' } },
//           ],
//         },
//       },
//       loading: false,
//       error: null,
//       refetch: mockRefetch,
//     });

//     (useGetChatWithUserLazyQuery as jest.Mock).mockReturnValue([mockFetchChat, { data: null }]);

//     (useUserManagement as jest.Mock).mockReturnValue({
//       selectedUser: null,
//       topRowUsers: [],
//       bottomUsers: [],
//       chattedUsers: [],
//       handleUserSelect: mockHandleUserSelect,
//       moveUserToBottom: mockMoveUserToBottom,
//       setChattedUsers: mockSetChattedUsers,
//       addNewMatch: jest.fn(),
//       removeMatch: jest.fn(),
//     });

//     (useMarkMessagesAsSeen as jest.Mock).mockReturnValue({
//       markMessagesAsSeen: mockMarkMessagesAsSeen,
//       autoMarkNewMessagesAsSeen: mockAutoMarkNewMessagesAsSeen,
//     });

//     (useMobileDetection as jest.Mock).mockReturnValue(false);

//     (usePageVisibility as jest.Mock).mockImplementation(() => {});

//     (useConversationsLoader as jest.Mock).mockImplementation(() => {});

//     (useSelectedChatLoader as jest.Mock).mockImplementation(() => {});

//     (useNotifications as jest.Mock).mockReturnValue({
//       notifications: [],
//       handleNotification: mockHandleNotification,
//       dismissNotification: mockDismissNotification,
//       setNotifications: mockSetNotifications,
//     });

//     (useAutoMarkMessagesAsSeen as jest.Mock).mockImplementation(() => {});

//     (useMessageSending as jest.Mock).mockReturnValue({
//       handleSend: mockHandleSend,
//       sending: false,
//       retryFailedMessage: jest.fn(),
//       handleInputChange: mockHandleInputChange,
//     });

//     (useSocketConnection as jest.Mock).mockImplementation(() => {});
//   });

//   it('renders without crashing', () => {
//     render(<ChatPage />);
//     expect(screen.getByTestId('matches')).toBeInTheDocument();
//   });

//   it('shows loading state when data is loading', () => {
//     (useGetMeQuery as jest.Mock).mockReturnValue({
//       data: null,
//       loading: true,
//       error: null,
//       refetch: mockRefetch,
//     });

//     render(<ChatPage />);
//     expect(screen.getByTestId('loading')).toBeInTheDocument();
//     expect(screen.getByText('Please Wait...')).toBeInTheDocument();
//   });

//   it('shows error state when there is an error', () => {
//     const errorMessage = 'Failed to load data';
//     (useGetMeQuery as jest.Mock).mockReturnValue({
//       data: null,
//       loading: false,
//       error: { message: errorMessage },
//       refetch: mockRefetch,
//     });

//     render(<ChatPage />);
//     expect(screen.getByText(`Error loading chat: ${errorMessage}`)).toBeInTheDocument();
//   });

//   it('displays matches and chat person on desktop view', () => {
//     render(<ChatPage />);
//     expect(screen.getByTestId('matches')).toBeInTheDocument();
//     expect(screen.getByTestId('chat-person')).toBeInTheDocument();
//   });

//   it('hides chat window on mobile when not selected', () => {
//     (useMobileDetection as jest.Mock).mockReturnValue(true);

//     render(<ChatPage />);
//     expect(screen.getByTestId('matches')).toBeInTheDocument();
//     expect(screen.getByTestId('chat-person')).toBeInTheDocument();
//     expect(screen.queryByTestId('chat-window')).not.toBeInTheDocument();
//   });

//   it('shows chat window on mobile when user is selected', () => {
//     (useMobileDetection as jest.Mock).mockReturnValue(true);
//     (useUserManagement as jest.Mock).mockReturnValue({
//       selectedUser: { id: 'test-user' },
//       topRowUsers: [],
//       bottomUsers: [],
//       chattedUsers: [],
//       handleUserSelect: mockHandleUserSelect,
//       moveUserToBottom: mockMoveUserToBottom,
//       setChattedUsers: mockSetChattedUsers,
//       addNewMatch: jest.fn(),
//       removeMatch: jest.fn(),
//     });

//     render(<ChatPage />);
//     expect(screen.getByTestId('chat-window')).toBeInTheDocument();
//   });

//   it('calls handleUserSelect when a user is selected', () => {
//     render(<ChatPage />);
//     fireEvent.click(screen.getByText('Select User'));
//     expect(mockHandleUserSelect).toHaveBeenCalledWith({ id: 'test-user' });
//   });

//   it('calls handleSend when send button is clicked', () => {
//     (useUserManagement as jest.Mock).mockReturnValue({
//       selectedUser: { id: 'test-user' },
//       topRowUsers: [],
//       bottomUsers: [],
//       chattedUsers: [],
//       handleUserSelect: mockHandleUserSelect,
//       moveUserToBottom: mockMoveUserToBottom,
//       setChattedUsers: mockSetChattedUsers,
//       addNewMatch: jest.fn(),
//       removeMatch: jest.fn(),
//     });

//     render(<ChatPage />);
//     fireEvent.change(screen.getByTestId('message-input'), { target: { value: 'Hello' } });
//     fireEvent.click(screen.getByText('Send'));
//     expect(mockHandleSend).toHaveBeenCalledWith('Hello', expect.any(Function));
//   });

//   it('calls handleInputChange when input value changes', () => {
//     (useUserManagement as jest.Mock).mockReturnValue({
//       selectedUser: { id: 'test-user' },
//       topRowUsers: [],
//       bottomUsers: [],
//       chattedUsers: [],
//       handleUserSelect: mockHandleUserSelect,
//       moveUserToBottom: mockMoveUserToBottom,
//       setChattedUsers: mockSetChattedUsers,
//       addNewMatch: jest.fn(),
//       removeMatch: jest.fn(),
//     });

//     render(<ChatPage />);
//     fireEvent.change(screen.getByTestId('message-input'), { target: { value: 'Hello' } });
//     expect(mockHandleInputChange).toHaveBeenCalledWith('Hello');
//   });

//   it('calls onBack when back button is clicked on mobile', () => {
//     (useMobileDetection as jest.Mock).mockReturnValue(true);
//     (useUserManagement as jest.Mock).mockReturnValue({
//       selectedUser: { id: 'test-user' },
//       topRowUsers: [],
//       bottomUsers: [],
//       chattedUsers: [],
//       handleUserSelect: mockHandleUserSelect,
//       moveUserToBottom: mockMoveUserToBottom,
//       setChattedUsers: mockSetChattedUsers,
//       addNewMatch: jest.fn(),
//       removeMatch: jest.fn(),
//     });

//     render(<ChatPage />);
//     fireEvent.click(screen.getByText('Back'));
//     expect(screen.queryByTestId('chat-window')).not.toBeInTheDocument();
//   });
//   it('displays notifications when present', () => {
//     const notification = {
//       id: 'notif1',
//       type: 'message',
//       title: 'New Message',
//       message: 'You have a new message',
//       timestamp: '10:30 AM',
//     };

//     (useNotifications as jest.Mock).mockReturnValue({
//       notifications: [notification],
//       handleNotification: mockHandleNotification,
//       dismissNotification: mockDismissNotification,
//       setNotifications: mockSetNotifications,
//     });

//     render(<ChatPage />);
//     expect(screen.getByText('New Message')).toBeInTheDocument();
//     expect(screen.getByText('You have a new message')).toBeInTheDocument();
//   });

//   it('dismisses notification when close button is clicked', async () => {
//     const notification = {
//       id: 'notif1',
//       type: 'message',
//       title: 'New Message',
//       message: 'You have a new message',
//       timestamp: '10:30 AM',
//     };

//     (useNotifications as jest.Mock).mockReturnValue({
//       notifications: [notification],
//       handleNotification: mockHandleNotification,
//       dismissNotification: mockDismissNotification,
//       setNotifications: mockSetNotifications,
//     });

//     render(<ChatPage />);
//     fireEvent.click(screen.getByText('✕'));
//     expect(mockDismissNotification).toHaveBeenCalledWith('notif1');
//   });

//   it('auto-dismisses notification after 5 seconds', async () => {
//     jest.useFakeTimers();
//     const notification = {
//       id: 'notif1',
//       type: 'message',
//       title: 'New Message',
//       message: 'You have a new message',
//       timestamp: '10:30 AM',
//     };

//     (useNotifications as jest.Mock).mockReturnValue({
//       notifications: [notification],
//       handleNotification: mockHandleNotification,
//       dismissNotification: mockDismissNotification,
//       setNotifications: mockSetNotifications,
//     });

//     render(<ChatPage />);
//     expect(screen.getByText('New Message')).toBeInTheDocument();

//     // Fast-forward 5 seconds
//     act(() => {
//       jest.advanceTimersByTime(5000);
//     });

//     await waitFor(() => {
//       expect(mockDismissNotification).toHaveBeenCalledWith('notif1');
//     });

//     jest.useRealTimers();
//   });
// });
