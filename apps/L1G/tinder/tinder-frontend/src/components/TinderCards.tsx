// "use client"

// import type React from "react"

// import { useState, useRef, useEffect } from "react"
// import { X, Heart, ChevronLeft, ChevronRight } from "lucide-react"
// import { Button } from "@/components/ui/button"

// interface Profile {
//   id: number
//   name: string

// }



// export default function TinderCards() {
//   const [profiles,setProfiles]=useState<Profile>([])
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
//   const [isDragging, setIsDragging] = useState(false)
//   const [isAnimating, setIsAnimating] = useState(false)
//   const cardRef = useRef<HTMLDivElement>(null)
//   const startPos = useRef({ x: 0, y: 0 })

//   const currentProfile = profiles[currentIndex]

//   const handleStart = (clientX: number, clientY: number) => {
//     if (isAnimating) return
//     setIsDragging(true)
//     startPos.current = { x: clientX, y: clientY }
//   }

//   const handleMove = (clientX: number, clientY: number) => {
//     if (!isDragging || isAnimating) return

//     const deltaX = clientX - startPos.current.x
//     const deltaY = clientY - startPos.current.y

//     setDragOffset({ x: deltaX, y: deltaY })
//   }

//   const handleEnd = () => {
//     if (!isDragging || isAnimating) return

//     setIsDragging(false)

//     const threshold = 100
//     const absX = Math.abs(dragOffset.x)

//     if (absX > threshold) {
//       // Swipe detected
//       const direction = dragOffset.x > 0 ? "right" : "left"
//       handleSwipe(direction)
//     } else {
//       // Snap back
//       setDragOffset({ x: 0, y: 0 })
//     }
//   }

//   const handleSwipe = (direction: "left" | "right") => {
//     if (isAnimating) return

//     setIsAnimating(true)

//     // Animate card off screen
//     const exitX = direction === "right" ? 400 : -400
//     setDragOffset({ x: exitX, y: dragOffset.y })

//     setTimeout(() => {
//       setCurrentIndex((prev) => (prev + 1) % profiles.length)
//       setDragOffset({ x: 0, y: 0 })
//       setIsAnimating(false)
//     }, 300)
//   }

//   const handleLike = () => handleSwipe("right")
//   const handlePass = () => handleSwipe("left")

//   const handlePrevious = () => {
//     if (isAnimating) return
//     setCurrentIndex((prev) => (prev - 1 + profiles.length) % profiles.length)
//   }

//   const handleNext = () => {
//     if (isAnimating) return
//     setCurrentIndex((prev) => (prev + 1) % profiles.length)
//   }

//   // Mouse events
//   const handleMouseDown = (e: React.MouseEvent) => {
//     e.preventDefault()
//     handleStart(e.clientX, e.clientY)
//   }

//   const handleMouseMove = (e: React.MouseEvent) => {
//     handleMove(e.clientX, e.clientY)
//   }

//   const handleMouseUp = () => {
//     handleEnd()
//   }

//   // Touch events
//   const handleTouchStart = (e: React.TouchEvent) => {
//     const touch = e.touches[0]
//     handleStart(touch.clientX, touch.clientY)
//   }

//   const handleTouchMove = (e: React.TouchEvent) => {
//     const touch = e.touches[0]
//     handleMove(touch.clientX, touch.clientY)
//   }

//   const handleTouchEnd = () => {
//     handleEnd()
//   }
// useEffect(() => {
   
//   }, [])

//   useEffect(() => {
//     const handleGlobalMouseMove = (e: MouseEvent) => {
//       if (isDragging) {
//         handleMove(e.clientX, e.clientY)
//       }
//     }

//     const handleGlobalMouseUp = () => {
//       if (isDragging) {
//         handleEnd()
//       }
//     }

//     if (isDragging) {
//       document.addEventListener("mousemove", handleGlobalMouseMove)
//       document.addEventListener("mouseup", handleGlobalMouseUp)
//     }

//     return () => {
//       document.removeEventListener("mousemove", handleGlobalMouseMove)
//       document.removeEventListener("mouseup", handleGlobalMouseUp)
//     }
//   }, [isDragging, dragOffset.x, dragOffset.y])

//   if (!currentProfile) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">No more profiles!</h2>
//           <p className="text-gray-600">Check back later for more matches.</p>
//         </div>
//       </div>
//     )
//   }

//   const rotation = dragOffset.x * 0.1
//   const opacity = Math.max(0.7, 1 - Math.abs(dragOffset.x) / 200)

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
//       <div className="relative w-full max-w-sm">
//         {/* Card Stack */}
//         <div className="relative h-[600px]">
//           {/* Background cards for depth */}
//           {profiles.slice(currentIndex + 1, currentIndex + 3).map((profile, index) => (
//             <div
//               key={profile.id}
//               className="absolute inset-0 bg-white rounded-2xl shadow-lg"
//               style={{
//                 transform: `scale(${0.95 - index * 0.02}) translateY(${index * 4}px)`,
//                 zIndex: -index - 1,
//               }}
//             />
//           ))}

//           {/* Main card */}
//           <div
//             ref={cardRef}
//             className="absolute inset-0 bg-white rounded-2xl shadow-xl cursor-grab active:cursor-grabbing select-none overflow-hidden"
//             style={{
//               transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
//               opacity,
//               transition: isDragging ? "none" : "all 0.3s ease-out",
//               zIndex: 10,
//             }}
//             onMouseDown={handleMouseDown}
//             onMouseMove={handleMouseMove}
//             onMouseUp={handleMouseUp}
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//           >
//             {/* Navigation arrows */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-md"
//               onClick={handlePrevious}
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </Button>

//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-md"
//               onClick={handleNext}
//             >
//               <ChevronRight className="h-5 w-5" />
//             </Button>

//             {/* Card content */}
//             <div className="relative h-full">
//               <img
//                 src={currentProfile.image || "/placeholder.svg"}
//                 alt={currentProfile.name}
//                 className="w-full h-full object-cover"
//                 draggable={false}
//               />

//               {/* Gradient overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

//               {/* Profile info */}
//               <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                 <h2 className="text-2xl font-bold mb-1">
//                   {currentProfile.name}, {currentProfile.age}
//                 </h2>
//                 <p className="text-lg opacity-90">
//                   {currentProfile.occupation} {currentProfile.company}
//                 </p>
//               </div>

//               {/* Swipe indicators */}
//               {dragOffset.x > 50 && (
//                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-12">
//                   <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-xl border-4 border-green-500">
//                     LIKE
//                   </div>
//                 </div>
//               )}

//               {dragOffset.x < -50 && (
//                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform -rotate-12">
//                   <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-xl border-4 border-red-500">
//                     NOPE
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Action buttons */}
//         <div className="flex justify-center gap-6 mt-8">
//           <Button
//             variant="outline"
//             size="lg"
//             className="w-16 h-16 rounded-full border-2 border-red-200 hover:border-red-300 hover:bg-red-50 transition-colors bg-transparent"
//             onClick={handlePass}
//             disabled={isAnimating}
//           >
//             <X className="h-6 w-6 text-red-500" />
//           </Button>

//           <Button
//             variant="outline"
//             size="lg"
//             className="w-16 h-16 rounded-full border-2 border-green-200 hover:border-green-300 hover:bg-green-50 transition-colors bg-transparent"
//             onClick={handleLike}
//             disabled={isAnimating}
//           >
//             <Heart className="h-6 w-6 text-green-500" />
//           </Button>
//         </div>

//         {/* Profile counter */}
//         <div className="text-center mt-4 text-gray-500">
//           {currentIndex + 1} of {profiles.length}
//         </div>
//       </div>
//     </div>
//   )
// }
