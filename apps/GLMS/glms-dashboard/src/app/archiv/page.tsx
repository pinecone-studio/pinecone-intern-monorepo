'use client';
import { CardWithForm } from "@/components/Card";

export default async function Index() {
  return (
    <div className="w-10/12 mx-auto ">
      {/* <h1 data-cy="Archiv-Page">hello from archiv Page</h1> */}
      <CardWithForm/>
      {/* <h1>This is the environment {process.env.ENVIRONMENT}</h1> */}
    </div>
  );
}
