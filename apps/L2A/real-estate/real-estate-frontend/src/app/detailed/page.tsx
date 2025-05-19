'use client';

import { useState } from 'react';
import ListingCard from '@/app/home/_components/ListingCard';
import { User, Phone, Ruler, BedDouble, Bath, Car, Building } from 'lucide-react';

const thumbnails = [
  '/listingcard.png',
  '/listingcard.png',
  '/listingcard.png',
  '/listingcard.png',
  '/listingcard.png',
  '/listingcard.png',
  '/listingcard.png',
  '/listingcard.png',
  '/listingcard.png',
];

const infoItems = [
  { icon: User, label: 'Эзэмшигч', value: 'Н.Мөнхтуяа' },
  { icon: Phone, label: 'Утасны дугаар', value: '99112233' },
  { icon: Ruler, label: 'Талбай', value: '200.0 м²' },
  { icon: BedDouble, label: 'Өрөө', value: '4 өрөө' },
  { icon: Bath, label: 'Ариун цэврийн өрөө', value: '2 өрөө' },
  { icon: Car, label: 'Дулаан зогсоол', value: 'Байхгүй' },
] as const;

const PropertyDetailPage = () => {
  const [mainImage, setMainImage] = useState('/listingcard.png');

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img src={mainImage} alt="Main Property" className="w-full h-[500px] object-cover rounded-2xl" />
          <div className="flex gap-4 mt-4 flex-wrap ">
            {thumbnails.map((src, idx) => (
              <img
                key={idx}
                src={src}
                onClick={() => setMainImage(src)}
                alt="Thumbnail"
                className="w-[121px] h-[68px] object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-orange-500"
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-1 flex gap-2 flex-col">
            <div className="flex items-center text-sm text-orange-500 font-medium gap-2">
              <Building className='h-4 w-4 ' />
              <span>Орон сууц</span>
            </div>
            <h1 className="text-2xl font-medium leading-none">Seoul Royal County хотхон</h1>
            <p className="text-muted-foreground text-sm leading-snug">Хан-Уул дүүрэг, 1-р хороо, Хан-Уул дүүрэг, 1-р хороо, Зайсан толгойн урд, америк сургуулийн хажууд </p>
          </div>

          <div data-testid="info-section" className="grid grid-cols-2 gap-x-8 gap-y-4 border-t pt-6 mt-4">
            {infoItems.map(({ icon: Icon, label, value }, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <Icon className="w-4 h-4 shrink-0 opacity-30" />
                <div className="flex flex-col">
                  <div className="flex gap-2 text-muted-foreground flex-col">
                    <span className="text-sm whitespace-nowrap">{label}</span>
                  </div>
                  <div className="text-sm font-medium text-black whitespace-nowrap">{value}</div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="border-t pt-6 mt-4 divide-y divide-border">
              <div className="flex justify-between py-3 text-sm">
                <span className="text-muted-foreground">Үнэ</span>
                <span className="font-medium text-right text-[#09090B] text-[21px]">880,000,000₮</span>
              </div>
              {[
                ['Ашиглалтад орсон он', '2012'],
                ['Цонхны тоо', '6'],
                ['Цонх', 'Төмөр вакум'],
                ['Хаалга', 'Төмөр вакум'],
                ['Хэдэн давхарт', '4 давхарт'],
                ['Барилгын давхар', '5 давхар'],
                ['Шал', 'Ламинат'],
                ['Тагт', '2 тагттай'],
                ['Лифт', 'Байгаа'],
              ].map(([label, value], i) => (
                <div key={i} className="flex justify-between py-3 text-sm">
                  <span className="text-muted-foreground whitespace-nowrap">{label}</span>
                  <span className="text-right whitespace-nowrap">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-muted-foreground text-sm leading-relaxed text-[black] w-[400px]">
              Seoul Royal County хотхонд тавтай морилно уу! Зайсанд байрлах энэхүү орчин үеийн, бараг шинэ, фермерийн хэв маягтай үзэсгэлэнтэй байшин нь онцгой, дахин давтагдашгүй шийдлүүдтэй. Шилэн
              эргэдэг хаалга нь таныг хоёр давхар өндөртэй, тэнгэрийн цонх, 16 фут урт эвхэгддэг хаалгатай их танхим руу чиглүүлж, улмаар өргөн задгай талбай руу гаргана. Гэр дотор болон гадаа орчинд
              амьдрах боломжтой энэхүү байшин нь зочдыг хүлээн авахад тохиромжтой.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Төстэй зарууд</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-cy="listing-Grid">
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <ListingCard
                key={i}
            image={"image.png"} price={880000000} title={"image2.png"} totalRooms={4} restrooms={2} size={200} city="1-р хороо, Зайсан" district="Хан-Уул дүүрэг, " imageCount="1/9"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
