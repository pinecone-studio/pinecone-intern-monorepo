export type AdminHeaderProps = {
    activeTab: 'ticket' | 'cancelRequest';
    setActiveTab: (tab: 'ticket' | 'cancelRequest') => void;
};

export const AdminHeader = ({ activeTab, setActiveTab }: AdminHeaderProps) => {
    return (
        <header className="w-full mt-4 px-6 bg-white">
            <div>
                <div className="flex justify-between pl-2">
                    <div className="flex gap-1 items-center mb-[14px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <circle cx="10" cy="10" r="10" fill="#00B7F4" />
                        </svg>
                        <h2 data-cy="logo-text" className="text-2xl font-semibold">TICKET BOOKING</h2>
                    </div>
                    <img src={"https://media.gettyimages.com/id/156303396/nl/foto/nerd-student-making-a-funny-smiling-face.jpg?s=2048x2048&w=gi&k=20&c=1cNfJMBwkqDDzcFcdbGW6AYg0waGFQLpFNHD2jDIm4w="} className="w-8 h-8 rounded-full object-cover object-center" />
                </div>
                <div className="flex [&>*]:py-2 [&>*]:px-3">
                    <button onClick={() => setActiveTab("ticket")} className={`${activeTab === "ticket" && "border-b border-black"}`}>Тасалбар</button>
                    <button onClick={() => setActiveTab("cancelRequest")} className={`${activeTab === "cancelRequest" && "border-b border-black"}`}>Цуцлах хүсэлт</button>
                </div>
            </div>
        </header>
    )
}