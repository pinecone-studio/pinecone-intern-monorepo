import React from 'react';

type ArticlesButtonProps = {
  able: boolean;
  addClass?: string;
  text: 'Save Draft' | 'Publish' | 'Ноорогт хадгалах' | 'Нийтлэх';
  typeText?: 'submit' | 'reset' | 'button' | undefined;
  dataCy: string;
};

export const ArticlesButton = ({ able, addClass, text, typeText, dataCy }: ArticlesButtonProps) => {
  return (
    <button type={typeText as 'submit' | 'reset' | 'button' | undefined} disabled={able} className={`button ${addClass}`} data-cy={dataCy}>
      {text}
    </button>
  );
};
