import Profile from "@/components/profile/Profile";

const ProfilePage = () => {
    return (
        <div className="w-full h-full pt-[34px]">
           <Profile isMine={true} isPrivate={false} userName={"Naraa0121"} bio={"Naraa_dev"} postsNumber={32} followersNumber={23} followingNumber={24}/>
        </div>
    );
};

export default ProfilePage;
