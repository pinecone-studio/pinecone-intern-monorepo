import { Badge } from '@/components/ui/badge';

const Interests = () => {
  const interests: string[] = ['Art', 'Music', 'Investment', 'Technology', 'Design', 'Education', 'Health', 'Fashion', 'Travel', 'Food'];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Interest</label>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <Badge data-testid="ner" key={interest} className="cursor-pointer bg-[#F4F4F5] text-black hover:bg-slate-200">
            {interest}
          </Badge>
        ))}
      </div>
      <p className="text-sm text-gray-500">You can select up to a maximum of 10 interests.</p>
    </div>
  );
};

export default Interests;
