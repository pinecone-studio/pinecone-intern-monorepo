import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="py-24 px-[117px]">
            <div className="flex justify-between">
                <div>
                    <Link href={"/"} >
                        <div className="flex gap-2 items-center cursor-pointer mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="10" r="10" fill="#00B7F4" />
                            </svg>
                            <p data-cy="logo-text" className="text-white text-xl font-semibold">TICKET BOOKING</p>
                        </div>
                    </Link>
                    <p className="text-[#FAFAFA] text-sm font-normal opacity-50">© 2024 Booking Mongolia. All Rights Reserved.</p>
                </div>
                <div>
                    <div className="text-[#FAFAFA] text-sm font-normal opacity-50 mb-3">Contact Information</div>
                    <div className="flex gap-12">
                        <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                <path d="M15.1667 4.6665L9.18668 8.4665C8.98086 8.59545 8.74289 8.66384 8.50001 8.66384C8.25713 8.66384 8.01916 8.59545 7.81334 8.4665L1.83334 4.6665M3.16668 2.6665H13.8333C14.5697 2.6665 15.1667 3.26346 15.1667 3.99984V11.9998C15.1667 12.7362 14.5697 13.3332 13.8333 13.3332H3.16668C2.4303 13.3332 1.83334 12.7362 1.83334 11.9998V3.99984C1.83334 3.26346 2.4303 2.6665 3.16668 2.6665Z" stroke="#FAFAFA" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div>
                                <p className="text-[#FAFAFA] text-sm font-normal opacity-50">Email:</p>
                                <p className="text-white text-sm font-light">support@ticketbooking.mn</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                <path d="M15.1667 11.2802V13.2802C15.1674 13.4659 15.1294 13.6497 15.055 13.8198C14.9806 13.9899 14.8715 14.1426 14.7347 14.2681C14.5979 14.3937 14.4364 14.4892 14.2605 14.5487C14.0846 14.6082 13.8982 14.6303 13.7133 14.6136C11.6619 14.3907 9.69133 13.6897 7.96 12.5669C6.34922 11.5433 4.98356 10.1777 3.96 8.56689C2.83332 6.8277 2.13216 4.84756 1.91333 2.78689C1.89667 2.60254 1.91858 2.41673 1.97767 2.24131C2.03675 2.06589 2.13171 1.90469 2.25651 1.76797C2.38131 1.63126 2.5332 1.52203 2.70253 1.44724C2.87185 1.37245 3.05489 1.33374 3.24 1.33356H5.24C5.56354 1.33038 5.87719 1.44495 6.12251 1.65592C6.36782 1.86689 6.52805 2.15986 6.57333 2.48023C6.65775 3.12027 6.8143 3.74871 7.04 4.35356C7.12969 4.59218 7.14911 4.8515 7.09594 5.10081C7.04277 5.35012 6.91924 5.57897 6.74 5.76023L5.89333 6.60689C6.84237 8.27592 8.2243 9.65786 9.89333 10.6069L10.74 9.76023C10.9213 9.58099 11.1501 9.45746 11.3994 9.40429C11.6487 9.35112 11.908 9.37053 12.1467 9.46023C12.7515 9.68593 13.38 9.84248 14.02 9.92689C14.3438 9.97258 14.6396 10.1357 14.851 10.3852C15.0624 10.6348 15.1748 10.9533 15.1667 11.2802Z" stroke="#FAFAFA" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div>
                                <p className="text-[#FAFAFA] text-sm font-normal opacity-50">Phone:</p>
                                <p className="text-white text-sm font-light">+976 (11) 123-4567</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                <path d="M2.5 9.33333H4.5C4.85362 9.33333 5.19276 9.47381 5.44281 9.72386C5.69286 9.97391 5.83333 10.313 5.83333 10.6667V12.6667C5.83333 13.0203 5.69286 13.3594 5.44281 13.6095C5.19276 13.8595 4.85362 14 4.5 14H3.83333C3.47971 14 3.14057 13.8595 2.89052 13.6095C2.64048 13.3594 2.5 13.0203 2.5 12.6667V8C2.5 6.4087 3.13214 4.88258 4.25736 3.75736C5.38258 2.63214 6.9087 2 8.5 2C10.0913 2 11.6174 2.63214 12.7426 3.75736C13.8679 4.88258 14.5 6.4087 14.5 8V12.6667C14.5 13.0203 14.3595 13.3594 14.1095 13.6095C13.8594 13.8595 13.5203 14 13.1667 14H12.5C12.1464 14 11.8072 13.8595 11.5572 13.6095C11.3071 13.3594 11.1667 13.0203 11.1667 12.6667V10.6667C11.1667 10.313 11.3071 9.97391 11.5572 9.72386C11.8072 9.47381 12.1464 9.33333 12.5 9.33333H14.5" stroke="#FAFAFA" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div>
                                <p className="text-[#FAFAFA] text-sm font-normal opacity-50">Customer Support::</p>
                                <p className="text-white text-sm font-light">Available 24/7</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}