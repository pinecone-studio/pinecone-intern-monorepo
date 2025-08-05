import { Button } from "@/components/ui/button"
import Image from "next/image"

const Profile = ({ isMine, isPrivate, userName, bio, postsNumber, followersNumber, followingNumber }: { isMine: boolean, isPrivate: boolean, userName: string, bio: string, postsNumber: number, followersNumber: number, followingNumber: number }) => {
    return (
        <div className="flex flex-col gap-[65px]">
            <div className="flex gap-25">
                <div><Image src="/" alt='profileImage' width={200} height={200} style={{ borderRadius: "100%", border: "black" }} /></div>
                <div>
                    <div>
                        <p>{userName}</p>
                        {isMine &&
                            <div className="flex gap-4">
                                <div className="flex gap-2">
                                    <Button>Edit Profile</Button>
                                    <Button>Ad tools</Button>
                                </div>
                                <Button>Settings</Button>
                            </div>
                        }
                        {!isMine && !isPrivate &&
                            <div  className="flex gap-4">
                               <div  className="flex gap-2">
                                 <Button>Follow</Button>
                                <Button>Message</Button>
                               </div>
                                <Button>...</Button>
                            </div>
                        }
                        {!isMine && isPrivate &&
                            <div className="flex gap-2">
                                <Button>Request</Button>
                                <Button>...</Button>
                            </div>
                        }

                    </div>
                    <div className="flex gap-8">
                        <p><b>{postsNumber}</b> posts</p>
                        <p><b>{followersNumber}</b> followers</p>
                        <p><b>{followingNumber}</b> following</p>
                    </div>
                    <div>
                        <p>{bio}</p>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <p>Post</p>
                </div>
                <div className="grid grid-cols-3 gap-1">
                    <Image src="/" alt="postImage" width={500} height={500} />
                </div>
            </div>
        </div>
    )
}

export default Profile