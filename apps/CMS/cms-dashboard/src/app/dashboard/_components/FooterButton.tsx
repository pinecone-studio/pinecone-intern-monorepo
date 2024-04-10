'use client';

type FooterButtonProps = {
  text: string;
};
export const FooterButton = (props: FooterButtonProps) => {
  const { text } = props;
  return <button>{text}</button>;
};
