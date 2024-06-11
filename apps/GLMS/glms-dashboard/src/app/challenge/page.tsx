'use client';

export default async function Index() {
  return (
    <div>
      <h1 data-cy="Challenge-Page">hello from Challenge Page</h1>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
    </div>
  );
}
