import DatePickerConcert from "./DatePickerConcert"

export const SearchConcert = () => {
    return (
        <div className="flex gap-2 mb-8">
            <div className="relative w-fit">
                <input data-cy="search-input" type="text" placeholder="Хайлт" className="w-80 py-3 pl-6 pr-12 bg-black border border-[#27272A] placeholder:text-sm rounded-md text-white text-sm focus:outline-none" />
                <div className="absolute top-1/2 right-6 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none">
                        <path d="M14 14L11.1333 11.1333M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z" stroke="#FAFAFA" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            <DatePickerConcert />
        </div>
    )
};