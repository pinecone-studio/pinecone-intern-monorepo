import "@testing-library/jest-dom" ;
import { render, screen } from '@testing-library/react';
import Profile from '@/components/Profile'; 


describe('Profile Component', () => {
    const defaultProps = {
        isMine: true,
        isPrivate: false,
        userName: "Naraa0121",
        bio: "Nice test",
        postsNumber: 21,
        followersNumber: 68,
        followingNumber: 121,
    };

    test('renders all main profile components', () => {
        render(<Profile {...defaultProps} />);

        expect(screen.getByText('Naraa0121')).toBeInTheDocument();
        expect(screen.getByText('Nice test')).toBeInTheDocument();
        expect(screen.getByTestId('posts-count')).toHaveTextContent('21 posts');
        expect(screen.getByTestId('followers-count')).toHaveTextContent('68 followers');
        expect(screen.getByTestId('following-count')).toHaveTextContent('121 following');
    })
})