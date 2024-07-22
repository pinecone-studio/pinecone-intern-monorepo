'use client';

import { FooterButtons } from "../dashboard/_features";

export default async function ArticlesPage() {
  return (
    <div>
      <h1 data-cy="Article-Page">hello from ArticlesPage</h1>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
      <div className="flex justify-center m-auto">
        <FooterButtons />
      </div>
    </div>
  );
}
