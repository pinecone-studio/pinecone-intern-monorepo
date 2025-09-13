import Link from "next/link"

export const Header = () => {
    return (
        <header className="w-full bg-black py-6 px-12">
            <div className="flex justify-between items-center">
                <Link href={"/"} >
                    <div className="flex gap-2 items-center cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <circle cx="10" cy="10" r="10" fill="#00B7F4" />
                        </svg>
                        <h2 data-cy="logo-text" className="text-white text-2xl font-semibold">TICKET BOOKING</h2>
                    </div>
                </Link>

                <div className="relative">
                    <input data-cy="search-input" type="text" placeholder="Хайлт" className="w-80 py-3 pl-6 pr-12 bg-black border border-[#27272A] placeholder:text-sm rounded-md text-white text-sm focus:outline-none" />
                    <div className="absolute top-1/2 right-6 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none">
                            <path d="M14 14L11.1333 11.1333M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z" stroke="#FAFAFA" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                <div className="flex gap-4 items-center">
                    <div className="flex items-center justify-center cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="none">
                            <g clipPath="url(#clip0_8820_1079)">
                                <path d="M1.36666 1.3667H2.7L4.47333 9.6467C4.53838 9.94994 4.70711 10.221 4.95047 10.4133C5.19383 10.6055 5.4966 10.7069 5.80666 10.7H12.3267C12.6301 10.6995 12.9243 10.5956 13.1607 10.4053C13.397 10.215 13.5614 9.94972 13.6267 9.65336L14.7267 4.70003H3.41333M6 14C6 14.3682 5.70152 14.6667 5.33333 14.6667C4.96514 14.6667 4.66666 14.3682 4.66666 14C4.66666 13.6318 4.96514 13.3334 5.33333 13.3334C5.70152 13.3334 6 13.6318 6 14ZM13.3333 14C13.3333 14.3682 13.0349 14.6667 12.6667 14.6667C12.2985 14.6667 12 14.3682 12 14C12 13.6318 12.2985 13.3334 12.6667 13.3334C13.0349 13.3334 13.3333 13.6318 13.3333 14Z" stroke="#FAFAFA" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_8820_1079">
                                    <rect width="16" height="16" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>

                    <div className="flex gap-4">
                        <Link href={"/signup"} >
                            <button data-cy="signup-btn" className="bg-black py-3 px-9 border border-[#27272A] rounded-[6px] text-white text-sm font-light">Бүртгүүлэх</button>
                        </Link>
                        <Link href={"/login"} >
                            <button data-cy="login-btn" className="bg-[#00B7F4] py-3 px-[46px] rounded-[6px] text-black text-sm font-light">Нэвтрэх</button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

