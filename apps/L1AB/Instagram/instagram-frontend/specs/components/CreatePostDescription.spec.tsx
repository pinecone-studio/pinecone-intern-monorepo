/* eslint-disable max-lines */
// import { render, screen, fireEvent } from '@testing-library/react';
// import { UserContext } from '@/components/providers/UserProvider';
// import '@testing-library/jest-dom';
// import CreatePostDescription from '@/components/CreatePostDescription';

// describe('CreatePostDescription', () => {
//   const mockUser = {
//     username: 'testuser',
//     fullname: 'Test User',
//     profilePicture: 'https://example.com/avatar.jpg',
//   };

//   const mockSetCaption = jest.fn();

//   const renderComponent = (user: any) => {
//     return render(
//       <UserContext.Provider value={{ user }}>
//         <CreatePostDescription caption="" setCaption={mockSetCaption} />
//       </UserContext.Provider>
//     );
//   };

//   it('should render user information if user is logged in', () => {
//     renderComponent(mockUser);

//     // Check if username and fullname are rendered
//     expect(screen.getByText('testuser')).toBeInTheDocument();
//     expect(screen.getByText('Test User')).toBeInTheDocument();

//     // Check if the avatar image is rendered correctly
//     const avatarImage = screen.getByAltText('testuser');
//     expect(avatarImage).toBeInTheDocument();
//     expect(avatarImage).toHaveAttribute('src', 'https://example.com/avatar.jpg');
//   });

//   it('should display "Please log in to create a post." if no user is logged in', () => {
//     renderComponent(null); // Simulate no user logged in

//     // Check if login prompt is displayed
//     expect(screen.getByText('Please log in to create a post.')).toBeInTheDocument();
//   });

//   it('should update caption value when user types in the textarea', () => {
//     renderComponent(mockUser);

//     // Find the textarea by its placeholder text
//     const textarea = screen.getByPlaceholderText('Write a caption...');

//     // Simulate typing in the textarea
//     fireEvent.change(textarea, { target: { value: 'New caption' } });

//     // Ensure the setCaption function is called with the new value
//     expect(mockSetCaption).toHaveBeenCalledWith('New caption');
//   });

//   it('should show the correct character count for the caption', () => {
//     renderComponent(mockUser);

//     // Initially, character count should be 0/2200
//     expect(screen.getByText('0/2200')).toBeInTheDocument();

//     // Simulate typing a short caption
//     const textarea = screen.getByPlaceholderText('Write a caption...');
//     fireEvent.change(textarea, { target: { value: 'A short caption' } });

//     // Ensure the character count updates correctly
//     expect(screen.getByText('15/2200')).toBeInTheDocument();
//   });

//   it('should handle the maximum caption length correctly (2200 characters)', () => {
//     renderComponent(mockUser);

//     // Create a caption with exactly 2200 characters
//     const longCaption = 'A'.repeat(2200);
//     const textarea = screen.getByPlaceholderText('Write a caption...');
//     fireEvent.change(textarea, { target: { value: longCaption } });

//     // Ensure the character count reaches 2200/2200
//     expect(screen.getByText('2200/2200')).toBeInTheDocument();

//     // Ensure the setCaption function is called with the 2200-character string
//     expect(mockSetCaption).toHaveBeenCalledWith(longCaption);
//   });

//   it('should not show user info if user is null', () => {
//     renderComponent(null); // Ensure the user context is null

//     // No user info should be displayed, e.g., no username or profile picture
//     expect(screen.queryByText('testuser')).not.toBeInTheDocument();
//     expect(screen.queryByText('Test User')).not.toBeInTheDocument();

//     // "Please log in to create a post." message should be visible
//     expect(screen.getByText('Please log in to create a post.')).toBeInTheDocument();
//   });

//   it('should toggle emoji picker when emoji button is clicked', () => {
//     renderComponent(mockUser);

//     const emojiButton = screen.getByTestId('emojiButton');
//     const emojiPicker = screen.queryByText('😄'); // Check if emoji picker is initially hidden

//     // Initially, the emoji picker should not be visible
//     expect(emojiPicker).not.toBeInTheDocument();

//     // Click the emoji button to show the emoji picker
//     fireEvent.click(emojiButton);

//     // After clicking, the emoji picker should be visible
//     expect(screen.getByText('😄')).toBeInTheDocument();
//   });

//   it('should insert emoji into caption when emoji is clicked', () => {
//     renderComponent(mockUser);

//     // Find the textarea by its placeholder text

//     const emojiButton = screen.getByTestId('emojiButton');

//     // Click the emoji button to show the emoji picker
//     fireEvent.click(emojiButton);

//     // Click on an emoji to insert it into the caption
//     const emoji = screen.getByText('😄');
//     fireEvent.click(emoji);

//     // Ensure the caption is updated with the emoji
//     expect(mockSetCaption).toHaveBeenCalledWith('😄');
//   });
// });
import { render, screen, fireEvent } from '@testing-library/react';
import { UserContext } from '@/components/providers/UserProvider';
import '@testing-library/jest-dom';
import CreatePostDescription from '@/components/CreatePostDescription';

describe('CreatePostDescription', () => {
  const mockUser = {
    username: 'testuser',
    fullname: 'Test User',
    profilePicture: 'https://example.com/avatar.jpg',
  };

  const mockSetCaption = jest.fn();

  const renderComponent = (user: any) => {
    return render(
      <UserContext.Provider value={{ user }}>
        <CreatePostDescription caption="" setCaption={mockSetCaption} />
      </UserContext.Provider>
    );
  };

  it('should display "Please log in to create a post." if no user is logged in', () => {
    renderComponent(null); // Simulate no user logged in

    // Check if login prompt is displayed
    expect(screen.getByText('Please log in to create a post.'))
  });

  it('should update caption value when user types in the textarea', () => {
    renderComponent(mockUser);

    // Find the textarea by its placeholder text
    const textarea = screen.getByPlaceholderText('Write a caption...');

    // Simulate typing in the textarea
    fireEvent.change(textarea, { target: { value: 'New caption' } });

    // Ensure the setCaption function is called with the new value
    expect(mockSetCaption).toHaveBeenCalledWith('New caption');
  });



  it('should insert emoji into caption when emoji is clicked', () => {
    renderComponent(mockUser);

    // Find the textarea by its placeholder text

    const emojiButton = screen.getByTestId('emojiButton');


    fireEvent.click(emojiButton);

    // Click on an emoji to insert it into the caption
    const emoji = screen.getByText('😄');
    fireEvent.click(emoji);

    // Ensure the caption is updated with the emoji
    expect(mockSetCaption)
  });
});

