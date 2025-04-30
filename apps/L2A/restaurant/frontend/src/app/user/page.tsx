import { AvatarEditor } from "./_components/AvatarEditor";

 
const Page = () => {
    return(
        <div className="flex flex-col items-center">
            <p className="text-[#441500] text-xl  py-8">Хэрэглэгчийн хэсэг</p>
            <AvatarEditor/>
        </div>
    )
}
export default Page;