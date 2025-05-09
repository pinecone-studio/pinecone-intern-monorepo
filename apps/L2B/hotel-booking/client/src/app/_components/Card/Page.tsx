import Image from "next/image"
import { Flower, ParkingCircle, Star, Wifi } from 'lucide-react'

const Card =()=>
<div data-testid="card-component" className="border-2 max-w-[380px] h-[424px] m-auto rounded-xl">
    <Image width={380} height={216} className="bg-gray-200" src={""} alt="" />
    <div className="p-4">
        <h1 className="font-bold text-base">Hotel Name</h1>
        <Star fill="orange"/>
        <div className="flex text-sm font-normal gap-3 mt-2 flex-col ">
            <p className="flex gap-2"><Wifi size={20} /> Free wifi</p>
            <p className="flex gap-2"><Flower size={20}/>Spa access</p>
            <p className="flex gap-2"><ParkingCircle size={20}/>Free self parking</p>
        </div>
        <div className="flex py-4 gap-2">
            <p className="bg-[#18BA51] rounded-full w-[39px] h-[20px] text-center ">8.6</p>
            <p className="text-sm font-medium">Excellent</p>
        </div>
    </div>
</div>
export default Card