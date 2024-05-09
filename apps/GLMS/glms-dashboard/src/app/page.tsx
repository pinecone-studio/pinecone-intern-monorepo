import Link from 'next/link';

const Home = () => {
  return (
    <div className="h-[92vh] flex w-full justify-center items-center">
      <div className="text-center">
        <h1>hello from GLMS dashboard</h1>
        <h1>This is the environment {process.env.ENVIRONMENT}</h1>
        <Link href="/dashboard">
          <button className="btn">Go to Dashboard</button>
        </Link>
      </div>
    </div>
  );
};
export default Home;
