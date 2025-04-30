const WalletPage = () => {
    return (
        <div className="bg-[#e4e4e7] h-screen w-full flex flex-col justify-between items-center"> 
            <div className="flex flex-col items-center justify-center ">
                <div className="text-[#441500] text-[19px] font-light">
                    Хэтэвч
                </div>
                <div className="text-[#121316] text-[36px] font-bold">
                    18,288
                </div>
                <div className="text-[#3F4145] text-[14px] font-extralight">
                    Үлдэгдэл
                </div>
                
            </div>
            <div data-testid="wallet-white-section" className="bg-[#ffffff] w-full h-3/4 rounded-t-xl">
        
                </div>
        </div>
    )
}

export default WalletPage;