import { Button } from '../shadcn/Button';
import { Checkbox } from '../shadcn/Checkbox';
// import { StudentMain } from './_student/_features';
// import { TopicMain } from './_topic/_features';

export default async function Index() {
  return (
    <div>
      <Button>Hello world!</Button>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Accept terms and conditions
        </label>
      </div>
    </div>
  );
}
