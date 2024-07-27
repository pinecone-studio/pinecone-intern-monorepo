import React from 'react';

type ArticlesButtonProps = {
  able: boolean;
  addClass?: string;
  text: 'Save Draft' | 'Publish' | 'Ноорогт хадгалах' | 'Нийтлэх';
  typeText?: 'submit' | 'reset' | 'draft-button';
  dataCy: string;
};

export const ArticlesButton = ({ able, addClass, text, typeText, dataCy }: ArticlesButtonProps) => {
  return (
    <button type={typeText} disabled={able} className={`button ${addClass}`} data-cy={dataCy}>
      {text}
    </button>
  );
};
