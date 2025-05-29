import Link from "next/link"

const  Footer=() => {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <header className="bg-gray-100 px-6 py-4 flex items-center justify-between">
       
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center" role="presentation">
            <div className="w-4 h-4  rounded-full bg-gray"></div>
          </div>
          <span className="text-gray-700 font-medium text-lg">Pedia</span>
        </Link>
           <div className="text-gray-500 text-sm">© Copyright 2024</div>
      </header>

  
      <div className="bg-gray-900 h-4"></div>
    </div>
  )
}
export default Footer;