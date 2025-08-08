import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface InputWithToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const InputWithToggle = ({ ...props }: InputWithToggleProps) => {
    const [show, setShow] = useState(false);

    const isPasswordType = props.type === "password";

    return (
        <div className="relative">
            <Input {...props} type={show ? "text" : props.type} />
            {isPasswordType && (
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    tabIndex={-1}
                >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
            )}
        </div>
    );
};
