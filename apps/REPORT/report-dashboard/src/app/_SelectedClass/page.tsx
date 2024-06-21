import 'tailwindcss/tailwind.css';
import { SelectedClassHeaderInfo } from '../topic/_features/SelectedClassHeaderInfo';
import { SelectedClassMain } from '../student/_features/SelectedClassMain';

export default async function Index() {
  return (
    <div>
      <SelectedClassHeaderInfo text="23LP1570" name="Багш " profile="https://avatars.githubusercontent.com/u/1000100?v=4" />
      <div className="bg-slate-200 h-[1px] "></div>
      <SelectedClassMain />
    </div>
  );
}
