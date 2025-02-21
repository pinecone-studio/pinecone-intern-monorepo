import { JcbCardIcon } from "@/components/user/ui/svg"
import { VisaCard } from "@/components/admin/svg"
import { MasterCardIcon } from "@/components/user/ui/svg"
import { AmericanExpressCard } from "@/components/admin/svg"

export const BookingLittle = () =>{
    return (
        <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <li>Reservation card detail</li>
                  <p className="leading-[20px] text-sm text-muted-foreground">Safe, secure transactions. Your personal information is protected</p>
                </div>
                <div className="flex gap-1">
                  <button className="w-[24px] h-[16px] hover:ring-2 hover:ring-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <JcbCardIcon width={24} height={16} />
                  </button>
                  <button className="w-[24px] h-[16px] hover:ring-2 hover:ring-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <VisaCard width={24} height={16} />
                  </button>
                  <button className="w-[24px] h-[16px] hover:ring-2 hover:ring-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <MasterCardIcon width={24} height={16} />
                  </button>
                  <button className="w-[24px] h-[16px] hover:ring-2 hover:ring-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <AmericanExpressCard width={24} height={16} />
                  </button>
                </div>
              </div>
    )
}