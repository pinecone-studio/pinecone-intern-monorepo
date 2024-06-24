'use client';
import { CardWithForm } from "./_components";

export default async function Index() {
  return (
    <div className="w-10/12 mx-auto ">
      {/* <h1 data-cy="Archiv-Page">hello from archiv Page</h1> */}
      <CardWithForm content="Сайтын загвар угсрах үндсэн суурь хэлнүүд бөгөөд бүрэн static болон"
  id="1"
  thumbnail="js.png"
  title="Javascript"/>
      {/* <h1>This is the environment {process.env.ENVIRONMENT}</h1> */}
    </div>
  );
}
