'use client';

import { CardWithForm } from "./archiv/_components";


const Home = () => {
  return (
    <>
      <div className="w-10/12 mx-auto">
        <h1 data-cy="Home-Page">hello from GLMS dashboard</h1>
        <h1>This is the environment {process.env.ENVIRONMENT}</h1>
        <CardWithForm content="Сайтын загвар угсрах үндсэн суурь хэлнүүд бөгөөд бүрэн static болон"
  id="1"
  thumbnail="js.png"
  title="Javascript"/>
      </div>
    </>
  );
};
export default Home;
