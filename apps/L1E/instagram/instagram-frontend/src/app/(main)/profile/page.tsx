"use client";

import Profile from "@/components/profile/Profile";
import { useAuth } from "@/components/providers/AuthProvider";

const ProfilePage = () => {
    const { user } = useAuth();
 
    return (
        <div className="w-full h-full pt-[34px]">
            <Profile
                isMine={true}
                isPrivate={user?.isPrivate as boolean}
                userName={user?.userName as string}
                bio={user?.bio as string || null}
                posts={user?.posts as any}
                followers={user?.followers as any}
                following={user?.following as any}
            />
        </div>
    );
};

export default ProfilePage;

