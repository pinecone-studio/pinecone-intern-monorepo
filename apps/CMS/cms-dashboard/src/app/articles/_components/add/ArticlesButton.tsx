import React from 'react';

type ArticlesButtonProps = {
  able: boolean;
  addClass?: string;
  text: 'Save Draft' | 'Publish' | 'Ноорогт хадгалах' | 'Нийтлэх' | 'Дараа төлөвлөх';
  typeText?: 'submit' | 'reset' | undefined;
  dataCy: string;
  onClick?: () => void;
};

export const ArticlesButton = ({ able, addClass, text, typeText, dataCy, onClick }: ArticlesButtonProps) => {
  return (
    <button type={typeText} disabled={able} className={`button ${addClass}`} data-cy={dataCy} onClick={onClick}>
      {text}
    </button>
  );
};
