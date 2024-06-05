'use client';
export default async function Index() {
  return (
    <div>
      <h1>hello from HRMS dashboard</h1>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
    </div>
  );
}
