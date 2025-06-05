'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormikContext } from 'formik';

const LocationSection = () => {
  const { values, setFieldValue } = useFormikContext<any>();
  const location = values.location || {};

  return (
    <div className="bg-white rounded-xl border p-6 space-y-4 shadow-sm">
      <h3 className="text-lg font-semibold">Байршил</h3>
      <p className="text-sm text-muted-foreground">Хаягийн мэдээллийг бөглөнө үү.</p>

      <div className="space-y-2">
        <Label htmlFor="district">Дүүрэг</Label>
        <Input
          id="district"
          name="location.district"
          value={location.district || ''}
          onChange={(e) => setFieldValue('location.district', e.target.value)}
          data-cy="input-district"
          data-testid="input-district"
        />

        <Label htmlFor="khoroo">Хороо</Label>
        <Input
          id="khoroo"
          name="location.city"
          value={location.city || ''}
          onChange={(e) => setFieldValue('location.city', e.target.value)}
          data-cy="input-city"
          data-testid="input-city"
        />

        <Label htmlFor="details">Дэлгэрэнгүй</Label>
        <Input
          id="details"
          name="location.address"
          value={location.address || ''}
          onChange={(e) => setFieldValue('location.address', e.target.value)}
          data-cy="input-address"
          data-testid="input-address"
        />
      </div>
    </div>
  );
};

export default LocationSection;
