'use client';
import { FooterButton } from '../_components/FooterButton';

const buttonNames = ['Button1', 'Button2'];
export const FooterButtons = () => {
  return (
    <>
      <h1>hi footer feature</h1>
      {buttonNames.map((item, index) => {
        return <FooterButton key={index} text={item} />;
      })}
    </>
  );
};
