import { IoMdCheckmarkCircleOutline } from "react-icons/io";
export default function Success() {
    return <div className="w-[374px] m-auto bg-gray-50 rounded-2xl border flex flex-col justify-center items-center py-14 gap-4">
        <IoMdCheckmarkCircleOutline className="text-4xl text-blue-600" />
        <p>Захиалга амжилттай баталгаажлаа.</p>
    </div>
}