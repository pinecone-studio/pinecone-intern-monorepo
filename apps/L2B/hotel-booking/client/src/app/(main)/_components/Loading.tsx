"use client"
import { useEffect, useState } from "react"

const Loading = () => {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 10) % 360)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">

        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
          <span className="text-2xl font-medium text-gray-900">Pedia</span>
        </div>


        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div
            className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: "transform 0.05s linear",
            }}
          ></div>
        </div>


        <p className="text-gray-500 text-base">Please Wait...</p>
      </div>
    </div>
  )
}
export default Loading;
