import { useEffect, useState } from "react";

export const useDebounce = (value: string | null, delay=600) => {
    const [debounce,setDebounce] = useState(value)

    useEffect(()=>{
     const timeout = setTimeout(()=>{
        setDebounce(value);
     }, delay);
     return ()=> clearTimeout(timeout)
    },[value, delay])

    return debounce
}