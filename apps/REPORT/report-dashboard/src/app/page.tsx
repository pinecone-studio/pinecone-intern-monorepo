import { StudentMain } from './_student/_features';
import { TopicMain } from './_topic/_features';
import 'tailwindcss/tailwind.css';
export default async function Index() {
  return (
    <div className="">
      <h1 className=" text-[40px] bg-red-500 text-red-900">hello from REPORT dashboard</h1>
      <TopicMain />
      <StudentMain />

      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
    </div>
  );
}
