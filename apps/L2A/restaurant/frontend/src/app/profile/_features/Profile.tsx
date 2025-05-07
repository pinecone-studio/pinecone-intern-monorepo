import { ClerkProvider, UserProfile } from '@clerk/nextjs';

const UseProfile = () => {
  return (
    <div>
      <ClerkProvider>
        <div>
          <h1 data-cyid="Хэрэглэгчийн хэсэг" className="text-center font-bold text-[#441500] text-[1.3rem] mt-5 mb-5">
            Хэрэглэгчийн хэсэг
          </h1>
          <div className="flex justify-center">
            <UserProfile />
          </div>
        </div>
      </ClerkProvider>
    </div>
  );
};
export default UseProfile;
