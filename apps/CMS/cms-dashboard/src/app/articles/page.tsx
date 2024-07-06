'use client';

export default async function ArticlesPage() {
  return (
    <div>
      <h1 data-cy="Article-Page">hello from ArticlesPage</h1>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
    </div>
  );
}
