"use client"
import { ForgotPassword, OTP, ResetPassword } from "@/components";
import { useState } from "react";

export default function Forget() {
    const [next, setNext] = useState(0)
    return (
        <div className="h-96">
            {next === 0 ? <OTP setNext={setNext} /> : next === 1 ? <ForgotPassword setNext={setNext} /> : <ResetPassword />}
        </div>
    );
}
