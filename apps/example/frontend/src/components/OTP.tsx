"use client"
import { useState } from "react"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useAuth } from "./utils/authProvider"
interface OTPProps {
    setNext: (next: number) => void;
}
export const OTP = ({ setNext }: OTPProps) => {
    const [value, setValue] = useState("")
    const { user } = useAuth()
    // console.log(user)
    if (user?.resetPasswordToken == value) {
        setNext(2)
    }
    return (
        <div className="w-[600px] m-auto space-y-6 text-center">
            <div className="w-fit m-auto">
                <svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.23" d="M0.129883 85.4987V34.9676L8 29.501H79L85.8698 34.9676V85.4987H0.129883Z" fill="black" />
                    <rect x="7.5" y="0.501953" width="72" height="76" fill="#F4F4F4" />
                    <path d="M85.8698 85.4979H0.129883L85.8698 34.9668V85.4979Z" fill="#DEDEDE" />
                    <path d="M0.129883 85.4979V34.9668L85.8698 85.4979H0.129883Z" fill="#EAEAEA" />
                </svg>
            </div>
            <div className="space-y-2">
                <h3 className="font-bold">Баталгаажуулах</h3>
                <p>“{user?.email}” хаягт илгээсэн баталгаажуулах кодыг оруулна уу</p>
            </div>
            <div className="w-fit m-auto">
                <InputOTP value={value} onChange={(value) => setValue(value)} maxLength={4}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                    </InputOTPGroup>
                </InputOTP>
            </div>
            <p className="text-sm text-gray-500">Дахин илгээх (30)</p>
        </div>
    )
}
