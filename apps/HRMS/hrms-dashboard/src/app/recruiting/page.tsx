'use client';

export default async function Index() {
  return (
    <div>
      <h1 data-cy="Recruiting-Page">hello from Recruiting Page</h1>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
    </div>
  );
}
