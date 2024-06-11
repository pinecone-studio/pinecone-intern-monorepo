'use client';

export default async function Index() {
  return (
    <div>
      <h1 data-cy="Comments-Page">hello from Comments Page</h1>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
    </div>
  );
}
