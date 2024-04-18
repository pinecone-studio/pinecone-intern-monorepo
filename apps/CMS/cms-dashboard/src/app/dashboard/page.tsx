import React from 'react';
import { FooterButtons, MenuBar } from './_features';

const Home = () => {
  return (
    <div data-cy="Dashboard-Welcome-Message">
      <MenuBar />
      Welcome to Cms Dashboard hello
      <FooterButtons />
    </div>
  );
};
export default Home;
