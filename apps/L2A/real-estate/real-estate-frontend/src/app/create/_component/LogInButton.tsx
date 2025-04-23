import Link from "next/link"
 
const LogInButton = () => {
    return(
        <div>
            <Link href={"/signin"} >
                 <button
                    type="submit"
                      className="w-full border-[#E4E4E7] text-black border py-2 rounded-2xl hover:bg-gray-400"
                 >
                 Log in
               </button>
            </Link>
        </div>
    )
}
 
export default LogInButton