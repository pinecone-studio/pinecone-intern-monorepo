'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const BuildingInfoSection = () => {
  const fields = [
    ['Ашиглалтанд орсон он', '2012', 'built-year'],
    ['Цонхны тоо', '6', 'window-count'],
    ['Цонх', 'Төмөр вакум', 'window-type'],
    ['Хаалга', 'Төмөр вакум', 'door-type'],
    ['Хэдэн давхарт', '4 давхарт', 'floor'],
    ['Барилгын давхар', '5 давхарт', 'building-floors'],
    ['Шал', 'Ламинат', 'flooring'],
    ['Тагт', '2 тагттай', 'balcony'],
  ];

  return (
    <div className="bg-white rounded-xl border p-6 space-y-4 shadow-sm">
      <h3 className="text-lg font-semibold">Барилгын дэлгэрэнгүй</h3>
      <p className="text-sm text-muted-foreground">Барилгын техникийн мэдээлэл</p>
      {fields.map(([label, value, cy], i) => (
        <div className="space-y-1" key={i}>
          <Label className="text-sm font-medium text-gray-700 leading-none">{label}</Label>
          <Input defaultValue={value} data-cy={`input-${cy}`} />
        </div>
      ))}
    </div>
  );
}
export default BuildingInfoSection;