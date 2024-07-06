'use client';

const Home = () => {
  return (
    <div>
      <h1>hello from Home dashboard</h1>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
    </div>
  );
};
export default Home;
