/* istanbul ignore file */

'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFormikContext } from 'formik';
  
const GeneralInfoSection = () => {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <div className="bg-white rounded-xl border p-6 space-y-6 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-xl font-inter">Ерөнхий мэдээлэл</h2>
      </div>

      <div className="flex flex-col gap-4">

        <div className="space-y-1">
          <Label>Төрөл</Label>
          
          
          <Select
            value={values.type}
            onValueChange={(value) => setFieldValue('type', value)}
          >
            <SelectTrigger data-testid="select-type" data-cy="select-type">
              <SelectValue placeholder="Сонгох" />
            </SelectTrigger>
        <SelectContent>
  <SelectItem value="APARTMENT" data-testid="select-item-APARTMENT">Орон сууц</SelectItem>
  <SelectItem value="HOUSE" data-testid="select-item-HOUSE">Амины орон сууц</SelectItem>
  <SelectItem value="OFFICE" data-testid="select-item-OFFICE">Оффис</SelectItem>
</SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Нэр</Label>
          <Input
            name="title"
            value={values.title}
            onChange={(e) => setFieldValue('title', e.target.value)}
            data-cy="input-name"
            data-testid="input-name"
          />
        </div>

        <div className="space-y-1">
          <Label>Үнэ</Label>
          <Input
            name="price"
            value={values.price}
            onChange={(e) => setFieldValue('price', e.target.value)}
            data-cy="input-price"
            data-testid="input-price"
          />
        </div>

        <div className="space-y-1">
          <Label>Талбай</Label>
          <Input
            name="size"
            value={values.size}
            onChange={(e) => setFieldValue('size', e.target.value)}
            data-cy="input-area"
            data-testid="input-area"
          />
        </div>

        <div className="space-y-1">
          <Label>Өрөө</Label>
          <Select
            value={values.totalRooms}
            onValueChange={(value) => setFieldValue('totalRooms', value)}
          >
            <SelectTrigger data-testid="select-room" data-cy="select-room">
              <SelectValue placeholder="Сонгох" />
            </SelectTrigger>
         <SelectContent>
<SelectItem value="1" data-testid="select-item-room-1">1 өрөө</SelectItem>
<SelectItem value="2" data-testid="select-item-room-2">2 өрөө</SelectItem>
<SelectItem value="3" data-testid="select-item-room-3">3 өрөө</SelectItem>
<SelectItem value="4" data-testid="select-item-room-4">4 өрөө</SelectItem>
<SelectItem value="5" data-testid="select-item-room-5">5 өрөө</SelectItem>
</SelectContent>

          </Select>
        </div>

        <div className="space-y-1">
          <Label>Ариун цэврийн өрөө</Label>
          <Select
            value={values.restrooms}
            onValueChange={(value) => setFieldValue('restrooms', value)}
          >
            <SelectTrigger data-testid="select-restroom" data-cy="select-restroom">
              <SelectValue placeholder="Сонгох" />
            </SelectTrigger>
         <SelectContent>
<SelectItem value="1" data-testid="select-item-restroom-1">1 өрөө</SelectItem>
<SelectItem value="2" data-testid="select-item-restroom-2">2 өрөө</SelectItem>
<SelectItem value="3" data-testid="select-item-restroom-3">3 өрөө</SelectItem>
</SelectContent>

          </Select>
        </div>

        <div className="space-y-1">
          <Label>Дулаан зогсоол</Label>
          <Select
            value={values.garage ? 'Байгаа' : 'Байхгүй'}
            onValueChange={(value) => setFieldValue('garage', value === 'Байгаа')}
          >
            <SelectTrigger data-testid="select-parking" data-cy="select-parking">
              <SelectValue placeholder="Сонгох" />
            </SelectTrigger>
            <SelectContent>
           <SelectContent>
  <SelectItem value="Байхгүй" data-testid="select-item-parking-Байхгүй">Байхгүй</SelectItem>
  <SelectItem value="Байгаа" data-testid="select-item-parking-Байгаа">Байгаа</SelectItem>
</SelectContent>

            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Дэлгэрэнгүй тайлбар</Label>
          <Textarea
            className="max-h-[136px] min-h-[136px]"
            data-cy="textarea-description"
            data-testid="textarea-description"
            value={values.description}
            onChange={(e) => setFieldValue('description', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoSection;
