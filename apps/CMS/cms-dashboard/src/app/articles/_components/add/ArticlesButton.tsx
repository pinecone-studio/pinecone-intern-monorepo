import React from 'react';

type ArticlesButtonProps = {
  able: boolean;
  addClass?: string;
  text: 'Save Draft' | 'Publish' | 'Ноорогт хадгалах' | 'Нийтлэх';
  typeText?: 'submit' | 'button' | 'reset' | undefined;
  dataCy: string;
};

export const ArticlesButton = ({ able, addClass, text, typeText, dataCy: dataCy }: ArticlesButtonProps) => {
  return (
    <button type={typeText} disabled={able} className={`button ${addClass}`} data-cy={dataCy}>
      {text}
    </button>
  );
};
