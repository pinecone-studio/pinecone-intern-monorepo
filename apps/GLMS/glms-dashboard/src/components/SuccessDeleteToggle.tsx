"use client";
import { useState } from "react";
import { CancelIcon } from "../../public/assets/CancelIcon";
import idealist from "../../public/idealist.png";

const SuccessDeleteToggle = () => {
    const [showSuccess, setShowSuccess] = useState(true);

    const handleToggle = () => {
        setShowSuccess(false);
    };

    return (
        <div className="relative w-[307px] h-[69px] bg-stone-100/50 flex justify-center items-center">
            {showSuccess && (
              <div>
                  <div className="w-[300px] flex items-center  gap-2 bg-green-500 rounded-lg p-2">
                    <img src={idealist.src} alt="Success Icon" />
                    <p>Амжилттай устгагдлаа</p>
                </div>
                <div className="absolute top-0 left-0 z-10">
                    <button onClick={handleToggle}>
                        <CancelIcon />
                    </button>
                </div>
              </div>
            )}
        </div>
    );
};

export default SuccessDeleteToggle;
