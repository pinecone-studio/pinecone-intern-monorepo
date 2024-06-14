'use client';

import { TextInputs } from './articles/_components';

const Home = () => {
  return (
    <div>
      <h1 data-cy="Home-Page">hello from CMS dashboard</h1>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
      <TextInputs />
    </div>
  );
};
export default Home;
