import {  StepTwoProps } from "../page"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useEffect, useState } from "react";
import { useRequestOtpMutation, useVerifyOtpMutation } from "@/generated";

export const StepTwo = ({setStep}:StepTwoProps) => {
    const [otp, setOtp] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [verifyOTP, { loading }] = useVerifyOtpMutation();
    const [requestOTP] = useRequestOtpMutation();
    const [email] = useState<string>(()=>localStorage.getItem('email') || '');
    const [timer, setTimer] = useState<number>(15); 
    const [resendEnabled, setResendEnabled] = useState<boolean>(false);


    const sendOTP = async ()=>{
        if(!email){
            setError('Email not found. Please restart the signup process.')
            return;
        }
        try {
            await requestOTP({variables:{email}})
            setTimer(15);
            setResendEnabled(false);
            
        }catch (error) {
            setError('Error sending OTP. Please try again.')
        }
    }
    useEffect(()=>{
        if(timer === 0){
            setResendEnabled(true);
            return;
        }
        const interval = setInterval(()=>{
            setTimer((prev)=> prev -1);
        }, 1000)
        return () => clearInterval(interval);
    }, [timer])

    useEffect(()=>{
        if(otp.length ===  6){
            verifyOTP({variables:{email, otp}})
            .then(({data})=>{
                if(data?.verifyOTP === true){
                    setStep(3);
                }else {
                    setError('Invalid OTP. Please try again.')
                }
            })
            .catch(()=>{
                setError('Error verifying OTP. Please try again.',)
            })
        }
    },[otp])

    return (
        <>
        <div className="flex flex-col items-center justify-center">
         <InputOTP data-cy="otp-input" onChange={(value)=> setOtp(value)} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot  index={0} />
        <InputOTPSlot  index={1} />
        <InputOTPSlot  index={2} />
        <InputOTPSlot  index={3} />
        <InputOTPSlot  index={4} />
        <InputOTPSlot  index={5} />
      </InputOTPGroup>
    </InputOTP>
      {error && <p className="text-red-500" data-cy="otp-error">{error}</p>}
      {!resendEnabled && <p className="text-gray-500" data-cy="resend-otp-button">Send again({timer})</p>}
      {resendEnabled && <button className="text-[15px] font-500 text-[#09090B]" onClick={sendOTP}>Send again({timer})</button>}
      {loading && <p className="text-gray-500" data-cy="otp-loading">Verifying OTP...</p>}
    </div>
        </>
    )
}