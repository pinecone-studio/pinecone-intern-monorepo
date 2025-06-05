/* eslint-disable complexity */
'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormikContext } from 'formik';

const BuildingInfoSection = () => {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <div className="bg-white rounded-xl border p-6 space-y-4 shadow-sm">
      <h3 className="text-lg font-semibold">Барилгын дэлгэрэнгүй</h3>
      <p className="text-sm text-muted-foreground">Барилгын техникийн мэдээлэл</p>

      <div className="space-y-1">
        <Label>Ашиглалтанд орсон он</Label>
        <Input
          type="text"
          value={values.completionDate || ''}
          onChange={(e) => setFieldValue('completionDate', e.target.value)}
          data-cy="input-built-year"
          data-testid="input-built-year"
        />
      </div>

      <div className="space-y-1">
        <Label>Цонхны тоо</Label>
        <Input
          type="number"
          value={values.windowsCount || ''}
          onChange={(e) => setFieldValue('windowsCount', e.target.value)}
          data-cy="input-window-count"
          data-testid="input-window-count"
        />
      </div>

      <div className="space-y-1">
        <Label>Цонх</Label>
        <Input
          value={values.windowType || ''}
          onChange={(e) => setFieldValue('windowType', e.target.value)}
          data-cy="input-window-type"
          data-testid="input-window-type"
        />
      </div>

      <div className="space-y-1">
        <Label>Хаалга</Label>
        <Input
          value={values.door || ''}
          onChange={(e) => setFieldValue('door', e.target.value)}
          data-cy="input-door-type"
          data-testid="input-door-type"
        />
      </div>

      <div className="space-y-1">
        <Label>Хэдэн давхарт</Label>
        <Input
          type="number"
          value={values.floorNumber || ''}
          onChange={(e) => setFieldValue('floorNumber', e.target.value)}
          data-cy="input-floor"
          data-testid="input-floor"
        />
      </div>

      <div className="space-y-1">
        <Label>Барилгын давхар</Label>
        <Input
          type="number"
          value={values.totalFloors || ''}
          onChange={(e) => setFieldValue('totalFloors', e.target.value)}
          data-cy="input-building-floors"
          data-testid="input-building-floors"
        />
      </div>

      <div className="space-y-1">
        <Label>Шал</Label>
        <Input
          value={values.roofMaterial || ''}
          onChange={(e) => setFieldValue('flooring', e.target.value)}
          data-cy="input-flooring"
          data-testid="input-flooring"
        />
      </div>

      <div className="space-y-1">
        <Label>Тагт</Label>
        <Input
          value={values.balcony ? 'Байгаа' : 'Байхгүй'}
          onChange={(e) =>
            setFieldValue('balcony', e.target.value.toLowerCase().includes('тагт'))
          }
          data-cy="input-balcony"
          data-testid="input-balcony"
        />
      </div>
    </div>
  );
};

export default BuildingInfoSection;
