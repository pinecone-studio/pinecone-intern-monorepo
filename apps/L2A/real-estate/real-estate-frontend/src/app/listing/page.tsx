'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ChevronDown } from 'lucide-react'
import ListingCard from '@/app/home/_components/ListingCard'

const HomeListingPage =()=> {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f8f8]" data-cy="listing-page">
      <main className="flex-1 flex flex-col lg:flex-row mx-auto w-full max-w-[1280px]">
        <aside className="w-full lg:w-[300px] border-r px-4 lg:px-6 py-6 bg-white text-sm" data-cy="listing-sidebar">
          <Input placeholder="Хот, дүүрэг, эсвэл газар хайх..." className="mb-5" data-cy="listing-search-input" />

          <div className="space-y-6">
            <div>
              <Label className="block mb-2">Төрөл</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2" data-cy="type-apartment"><Checkbox id="apartment" /><Label htmlFor="apartment">Байр</Label></div>
                <div className="flex items-center gap-2" data-cy="type-house"><Checkbox id="house" /><Label htmlFor="house">Хаус</Label></div>
                <div className="flex items-center gap-2" data-cy="type-office"><Checkbox id="office" /><Label htmlFor="office">Оффис</Label></div>
              </div>
            </div>

            <div>
              <Label className="block mb-2">Байршил</Label>
              <select className="w-full mb-2 border rounded px-2 py-1 text-sm" data-cy="select-city">
                <option>Хот</option>
              </select>
              <select className="w-full border rounded px-2 py-1 text-sm" data-cy="select-district">
                <option>Дүүрэг</option>
              </select>
            </div>

            <div>
              <Label className="block mb-2">Үнэ</Label>
              <select className="w-full border rounded px-2 py-1 text-sm" data-cy="price-min">
                <option>Доод</option>
              </select>
              <select className="w-full mt-2 border rounded px-2 py-1 text-sm" data-cy="price-max">
                <option>Дээд</option>
              </select>
            </div>

            <div>
              <Label className="block mb-2">Өрөө</Label>
              <div className="space-y-1">
                <div className="flex items-center gap-2" data-cy="room-1"><Checkbox id="room-1" /><Label htmlFor="room-1">1 өрөө</Label></div>
                <div className="flex items-center gap-2" data-cy="room-2"><Checkbox id="room-2" /><Label htmlFor="room-2">2 өрөө</Label></div>
                <div className="flex items-center gap-2" data-cy="room-3"><Checkbox id="room-3" /><Label htmlFor="room-3">3 өрөө</Label></div>
                <div className="flex items-center gap-2" data-cy="room-4"><Checkbox id="room-4" /><Label htmlFor="room-4">4 өрөө</Label></div>
                <div className="flex items-center gap-2" data-cy="room-5"><Checkbox id="room-5" /><Label htmlFor="room-5">5 өрөө</Label></div>
              </div>
            </div>

            <div>
              <Label className="block mb-2">Ариун цэврийн өрөө</Label>
              <div className="space-y-1">
                <div className="flex items-center gap-2" data-cy="bath-1"><Checkbox id="bath-1" /><Label htmlFor="bath-1">1 өрөө</Label></div>
                <div className="flex items-center gap-2" data-cy="bath-2"><Checkbox id="bath-2" /><Label htmlFor="bath-2">2 өрөө</Label></div>
                <div className="flex items-center gap-2" data-cy="bath-3"><Checkbox id="bath-3" /><Label htmlFor="bath-3">3 өрөө</Label></div>
              </div>
            </div>

            <div>
              <Label className="block mb-2">Бусад</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2" data-cy="option-garage"><Checkbox id="garage" /><Label htmlFor="garage">Дулаан зогсоол</Label></div>
                <div className="flex items-center gap-2" data-cy="option-lift"><Checkbox id="lift" /><Label htmlFor="lift">Лифт</Label></div>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex-1 px-4 sm:px-6 py-6" data-cy="listing-section">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 text-sm">
            <p className="text-muted-foreground" data-cy="listing-count">Нийт: 102 зарууд</p>
            <Button variant="outline" className="flex items-center gap-1 w-fit" data-cy="sort-button">
              Сүүлд нэмэгдсэн <ChevronDown className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-cy="listing-grid">
            {Array(18).fill(0).map((_, i) => (
              <ListingCard
                key={i}
                imageUrl="/listingcard.png"
                price="880,000,000₮"
                title="Зайсан seoul royal country хотхон"
                area={200}
                beds={4}
                baths={2}
                location="Хан-Уул дүүрэг, 1-р хороо, Хан-Уул дүүрэг..."
              />
            ))}
          </div>
          <div></div>
        </section>
      </main>
    </div>
  )
}
export default HomeListingPage 