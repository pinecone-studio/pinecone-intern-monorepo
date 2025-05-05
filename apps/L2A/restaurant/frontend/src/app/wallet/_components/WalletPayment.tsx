type WalletChangeProps = {
    amount: number;
    date: string;
    time: string;
  };

const WalletPayment = ({ amount, date, time }:WalletChangeProps) => {
    return(
        <div className="flex items-center justify-between  shadow-sm p-4 w-full max-w-md">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#f1f5f9] flex items-center justify-center border border-blue-500">
            <svg
            data-testid="arrow-icon"
              className="w-4 h-4 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
          <span className="text-lg font-bold text-black">+{amount}</span>
        </div>
        <span className="text-sm text-gray-600">{`${date} ${time}`}</span>
      </div>
    )
}
export default WalletPayment;