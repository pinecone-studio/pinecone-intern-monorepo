import { useAuth } from '@/components/providers';

export const HeaderProfile = () => {
  const { user } = useAuth();
  return (
    <main className="container px-4">
      <div className=" flex flex-col">
        <h3 className="text-2xl font-inter font-semibold leading-8">Hi, Shagai</h3>
        <p className="text-base font-inter font-normal leading-6 text-[#71717A]">{user?.email}</p>
      </div>
    </main>
  );
};
