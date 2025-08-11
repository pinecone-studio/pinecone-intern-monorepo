import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const InputWithToggle = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
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
