import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wifi, Flower2, Car, UtensilsCrossed, Dumbbell, Bus, Sparkles, ChevronRight } from "lucide-react"


const RoomCard = () => {
    return (
        <div className=" bg-gray-800 ">
            <div className=" max-w-sm scale-75">

                <div className="flex items-center gap-2 mb-4 text-white">
                </div>


                <Card className="w-full">
                    <CardContent className="p-0">

                        <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>

                        <div className="p-6">

                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Economy Double Room, City View</h2>


                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Wifi className="w-5 h-5" />
                                    <span>Free WiFi</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Flower2 className="w-5 h-5" />
                                    <span>Spa access</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Car className="w-5 h-5" />
                                    <span>Free self parking</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <UtensilsCrossed className="w-5 h-5" />
                                    <span>Complimentary breakfast</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Dumbbell className="w-5 h-5" />
                                    <span>Fitness center access</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Bus className="w-5 h-5" />
                                    <span>Airport shuttle service</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Sparkles className="w-5 h-5" />
                                    <span>Room cleaning service</span>
                                </div>
                            </div>


                            <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 mb-8">
                                <span>Show more</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>


                            <div className="mb-6">
                                <div className="text-sm text-gray-600 mb-1">Total</div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">150,000₮</div>
                                <div className="text-gray-600">80,000₮ Price per night</div>
                            </div>


                            <div className="flex items-center justify-between">
                                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                                    <span>Price detail</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">Reserve</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
export default RoomCard;
