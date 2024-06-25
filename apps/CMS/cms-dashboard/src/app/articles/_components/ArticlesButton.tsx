'use client';

import { Button } from '@/components/ui/button';
type PropsType = {
  text: string;
  addClass?: string;
  able?: boolean;
  typeText?: 'submit' | 'button' | 'reset' | undefined;
};

export const ArticlesButton = ({ text, addClass, able, typeText }: PropsType): JSX.Element => {
  return (
    <div className="flex w-full cursor-pointer hover:text-white">
      <Button disabled={able} className={`w-full ${addClass}`} data-cy="submit-button" type={typeText}>
        {text}
      </Button>
    </div>
  );
};
