import React from 'react';

type CustomButtonType = 'submit' | 'reset' | 'draft-button' | undefined;

type ArticlesButtonProps = {
  able: boolean;
  addClass?: string;
  text: string;
  typeText?: CustomButtonType;
  dataCy: string;
};

export const ArticlesButton = ({ able, addClass, text, typeText = 'submit', dataCy }: ArticlesButtonProps) => {
  return (
    <button type={typeText as CustomButtonType} disabled={able} className={`button ${addClass}`} data-cy={dataCy}>
      {text}
    </button>
  );
};
