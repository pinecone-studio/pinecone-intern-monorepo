'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LocationSection = ()=> {
  return (
    <div className="bg-white rounded-xl border p-6 space-y-4 shadow-sm">
      <h3 className="text-lg font-semibold">Байршил</h3>
      <p className="text-sm text-muted-foreground">Хаягийн мэдээллийг бөглөнө үү.</p>
      <div className="space-y-2">
        <Label htmlFor="district">Дүүрэг</Label>
        <Input id="district" defaultValue="Хан-Уул" data-cy="input-district" />

        <Label htmlFor="khoroo">Хороо</Label>
        <Input id="khoroo" defaultValue="1-р хороо" data-cy="input-khoroo" />

        <Label htmlFor="details">Дэлгэрэнгүй</Label>
        <Input
          id="details"
          defaultValue="Хан-Уул дүүрэг, 1-р хороо, Зайсан толгойн урд, америк сургуулийн хажууд"
          data-cy="input-details"
        />
      </div>
    </div>
  );
}
export default LocationSection;