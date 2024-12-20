import { UserMatchComp } from '@/components/match/UserMatchComp';
import { render, screen } from '@testing-library/react';

describe('User match component', () => {
  it('Should call successfull', () => {
    render(
      <UserMatchComp
        isOpen={true}
        userImage="hehe"
        matchImage="hheh"
        matchName="Baatarvan"
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(screen.getAllByText('Send'));
  });
});
