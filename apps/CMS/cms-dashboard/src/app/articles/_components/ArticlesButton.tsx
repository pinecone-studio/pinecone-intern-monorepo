import React from 'react';
import { Button } from '@/components/ui/button';

type ArticlesButtonProps = {
  able: boolean;
  addClass?: string;
  text: 'Save Draft' | 'Publish' | 'Ноорогт хадгалах' | 'Нийтлэх';
  typeText?: 'submit' | 'button' | 'reset' | undefined;
  'data-cy'?: string;
};

export const ArticlesButton = ({ able, addClass, text, typeText, 'data-cy': dataCy }: ArticlesButtonProps) => {
  return (
    <Button type={typeText} disabled={able} className={`button ${addClass}`} data-cy={dataCy}>
      {text}
    </Button>
  );
};
