import DatePickerConcert from "./DatePickerConcert"

export const TicketBuy = () => {
    return (
        <div className="bg-[#131313] h-fit rounded-xl">
            <div className="p-6">
                <h6 className="text-[#FAFAFA] text-sm font-light opacity-50 mb-2">Тоглолт үзэх өдрөө сонгоно уу.</h6>
                <DatePickerConcert />
            </div>

            <div>
                <div>
                    <hr className="border-t border-dashed border-[#27272A]" />
                    <div className="flex gap-2 py-4 px-6 items-center text-white justify-between">
                        <div className="flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <circle cx="6" cy="6" r="6" fill="#C772C4" />
                            </svg>

                            <div>
                                <h6 className="text-xs font-normal text-[#C772C4]">Завсарын тасалбар (38)</h6>
                                <p className="text-white">99&apos;000₮</p>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center">
                            <button className="flex justify-center items-center py-2 px-4 rounded-md border border-[#27272A] bg-[#1F1F1F]">
                                -
                            </button>

                            <p>0</p>

                            <button className="flex justify-center items-center py-2 px-4 rounded-md border border-[#27272A] bg-[#1F1F1F]">
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <hr className="border-t border-dashed border-[#27272A]" />
                    <div className="flex gap-2 py-4 px-6 items-center text-white justify-between">
                        <div className="flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <circle cx="6" cy="6" r="6" fill="#D9D9D9" />
                            </svg>

                            <div>
                                <h6 className="text-xs font-normal text-[#D7D7F8]">Арын тасалбар (123)</h6>
                                <p className="text-white">129&apos;000₮</p>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center">
                            <button className="flex justify-center items-center py-2 px-4 rounded-md border border-[#27272A] bg-[#1F1F1F]">
                                -
                            </button>

                            <p>0</p>

                            <button className="flex justify-center items-center py-2 px-4 rounded-md border border-[#27272A] bg-[#1F1F1F]">
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <hr className="border-t border-dashed border-[#27272A]" />
                    <div className="flex gap-2 py-4 px-6 items-center text-white justify-between">
                        <div className="flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <circle cx="6" cy="6" r="6" fill="#4651C9" />
                            </svg>

                            <div>
                                <h6 className="text-xs font-normal text-[#4651C9]">Нүүрний тасалбар (38)</h6>
                                <p className="text-white">159&apos;000₮</p>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center">
                            <button className="flex justify-center items-center py-2 px-4 rounded-md border border-[#27272A] bg-[#1F1F1F]">
                                -
                            </button>

                            <p>0</p>

                            <button className="flex justify-center items-center py-2 px-4 rounded-md border border-[#27272A] bg-[#1F1F1F]">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-6 px-6 space-y-4">
                <div className="flex justify-between">
                    <p className="text-[#A1A1AA] text-sm font-light">Энгийн тасалбар x 3</p>
                    <p className="text-[#A1A1AA] text-sm font-normal">267&apos;000₮</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-[#A1A1AA] text-sm font-light">VIP тасалбар x 2</p>
                    <p className="text-[#A1A1AA] text-sm font-normal">258&apos;000₮</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-[#A1A1AA] text-sm font-light">Нийт төлөх дүн:</p>
                    <p className="text-[#FAFAFA] text-xl font-bold">258&apos;000₮</p>
                </div>
            </div>

            <div className="p-6">
                <button className="py-2 px-4 text-black bg-[#00B7F4] rounded-md text-sm font-medium w-full">Тасалбар авах</button>
            </div>
        </div>
    )
}