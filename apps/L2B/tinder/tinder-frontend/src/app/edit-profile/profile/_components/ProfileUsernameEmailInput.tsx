import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
type Usertype = {
  name: string;
  email: string;
};
export const ProfileUsernameEmailInput = ({ handleChange, editUserdata }: { handleChange: (_e: React.ChangeEvent<HTMLInputElement>) => void, editUserdata: Usertype}) => {
  return (
    <div className="border-t pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Username"
            defaultValue={editUserdata.name}
            onChange={handleChange}
            disabled={false}
            className="w-full border px-3 py-2 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed text-black disabled:text-black"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Email" name="email" defaultValue={editUserdata.email} className="mt-auto" onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};
