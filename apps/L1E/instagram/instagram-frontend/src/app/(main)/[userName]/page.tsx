"use client";

import Profile from "@/components/profile/Profile";
import { useAuth } from "@/components/providers/AuthProvider";
import { useGetSomeoneProfileQuery } from "@/generated";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const InstagramProfile = () => {
    const params = useParams();
    const userName = params?.userName as string;
    const [isMine, setIsMine] = useState(false);

    const { data, loading, error } = useGetSomeoneProfileQuery({
        variables: { userName },
        skip: !userName,
    });

    // console.log(data, "data")
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    const { user } = useAuth();
        if (user?.userName === data?.getSomeoneProfile.userName) {
            console.log(user, "it is me!!!")
            setIsMine(true);
        }

    return (
        <div className="p-4">
            <Profile
                isMine={isMine}
                userName={data?.getSomeoneProfile.userName as string}
                bio={data?.getSomeoneProfile.bio}
                isPrivate={data?.getSomeoneProfile.isPrivate as boolean}
                image={data?.getSomeoneProfile.profileImage as string}
                posts={data?.getSomeoneProfile.posts as any}
                followers={data?.getSomeoneProfile.followers as any}
                following={data?.getSomeoneProfile.following as any}
            />
        </div>
    );
};

export default InstagramProfile;
