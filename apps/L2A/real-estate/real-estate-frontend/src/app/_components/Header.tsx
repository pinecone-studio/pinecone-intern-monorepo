'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Image from 'next/image'

const Header=()=>{
  return (
    <div className="w-full bg-white border-b">
      <header className="max-w-[1280px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 gap-2">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} className="object-contain" />
          <span className="text-lg font-semibold">Home Vault</span>
        </div>
        <div className="flex gap-2 items-center flex-wrap justify-end">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1 rounded-xl px-4 py-2">
            <Plus className="w-4 h-4" /> Зар оруулах
          </Button>
          <Button variant="ghost" className="text-sm">Бүртгүүлэх</Button>
          <Button variant="ghost" className="text-sm">Нэвтрэх</Button>
        </div>
      </header>
    </div>
  )
}
export default Header
