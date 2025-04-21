import React from "react"

const forgotpassword = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center">
        <div className="flex items-center mb-8 justify-center gap-4">
          <img src="/logo.png" alt="Home Vault Logo" className="h-8 "  />
          <h1 className="text-[22px] font-lg">Home Vault</h1>
        </div>
        <h2 className="text-[24px] font-md mb-2">Forget password</h2>
        <p className="text-gray-500 mb-6">
          Enter your email account to reset password
        </p>
        <form className="space-y-4">

        <div className="flex flex-col items-start gap-2">
            <div className="text-[14px] font-normal">Email</div>
        <input
            type="email"
            placeholder="name@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition"
          >
            Continue
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-10">©2024 Tinder</p>
      </div>
    </div>
    )
}
export default forgotpassword;