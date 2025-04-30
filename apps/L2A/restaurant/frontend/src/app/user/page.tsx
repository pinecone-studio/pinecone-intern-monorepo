import { AvatarEditor } from "./_components/AvatarEditor";
import { InfoEditor } from "./_components/InfoEditor";
 
const Page = () => {
    return(
        <div className="flex flex-col items-center w-full px-10">
            <p className="text-[#441500] text-xl  py-8">Хэрэглэгчийн хэсэг</p>
            <AvatarEditor/>
            <InfoEditor label="Утас:" value="99780680" withBorder />
            <InfoEditor label="Имэйл хаяг:" value="mimosa.universe@gmail.com" withBorder />
            <InfoEditor label="Нууц үг:" value="***********" />
        </div>
    )
}
export default Page;