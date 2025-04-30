import { PiUserLight } from "react-icons/pi";
import { FiEdit2 } from "react-icons/fi";
 
export const AvatarEditor = () => {
    return (
        <>
         <div
           data-testid="user-avatar"
           className="w-[26vw] h-[26vw] rounded-full bg-[#F4F4F5] flex justify-center items-center mt-3 mb-3"
         >
            <PiUserLight className="w-[12vw] h-[12vw] text-[#441500]" />
         </div>
         <div
           data-testid="edit-button"
           className="rounded-full border-[1px] bg-white border-[#E4E4E7] w-[11vw] h-[11vw] flex justify-center items-center absolute top-[19%] left-[55%] cursor-pointer"
         >
            <FiEdit2 className="w-5 h-5 text-[#441500]" />
         </div>
        </>
    )
}