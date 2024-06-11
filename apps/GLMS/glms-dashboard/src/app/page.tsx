'use client';

const Home = () => {
  return (
    <>
      <div>
        <h1 data-cy="Home-Page">hello from GLMS dashboard</h1>
        <h1>This is the environment {process.env.ENVIRONMENT}</h1>
      </div>
    </>
  );
};
export default Home;
