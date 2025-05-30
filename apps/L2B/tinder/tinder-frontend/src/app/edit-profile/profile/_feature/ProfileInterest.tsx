import { FormField, FormItem, FormLabel } from '@/components/ui/form';

type ProfileInterestProps = {
  control: any;
  name: string;
};

export const ProfileInterest = ({ control, name }: ProfileInterestProps) => {
  const interests = [
    'Art',
    'Music',
    'Investment',
    'Technology',
    'Design',
    'Education',
    'Health',
    'Fashion',
    'Travel',
    'Food',
    'Sports',
    'Gaming',
    'Fitness',
    'Photography',
    'Writing',
    'Cooking',
    'Nature',
    'Volunteering',
    'Science',
    'History',
  ];

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedInterests: string[] = field.value;

        const toggleInterest = (interest: string) => {
          let updated: string[];
          if (selectedInterests.includes(interest)) {
            updated = selectedInterests.filter((item) => item !== interest);
          } else {
            updated = [...selectedInterests, interest];
          }
          field.onChange(updated);
        };

        return (
          <FormItem>
            <FormLabel>Interest</FormLabel>
            <div className="border rounded-md p-3">
              <div className="flex flex-wrap gap-3">
                {interests.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);

                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      data-testid={`interest-${interest}`}
                      className={`
                        px-3 py-1 rounded-lg border transition-all duration-200
                        ${isSelected ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}

                      `}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>
          </FormItem>
        );
      }}
    />
  );
};
