'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const GeneralInfoSection = () => {
  const fields = [
    {
      label: 'Төрөл',
      component: (
        <Select defaultValue="Орон сууц">
          <SelectTrigger data-testid="select-type">
            <SelectValue placeholder="Сонгох" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Орон сууц">Орон сууц</SelectItem>
            <SelectItem value="Амины орон сууц">Амины орон сууц</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      label: 'Нэр',
      component: <Input defaultValue="Seoul royal county хотхон" data-testid="input-name" />,
    },
    {
      label: 'Үнэ',
      component: <Input defaultValue="880,000,000" data-testid="input-price" />,
    },
    {
      label: 'Талбай',
      component: <Input defaultValue="200" data-testid="input-area" />,
    },
    {
      label: 'Өрөө',
      component: (
        <Select defaultValue="4">
          <SelectTrigger data-testid="select-room">
            <SelectValue placeholder="Сонгох" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 өрөө</SelectItem>
            <SelectItem value="2">2 өрөө</SelectItem>
            <SelectItem value="3">3 өрөө</SelectItem>
            <SelectItem value="4">4 өрөө</SelectItem>
            <SelectItem value="5">5 өрөө</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      label: 'Ариун цэврийн өрөө',
      component: (
        <Select defaultValue="2">
          <SelectTrigger data-testid="select-restroom">
            <SelectValue placeholder="Сонгох" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 өрөө</SelectItem>
            <SelectItem value="2">2 өрөө</SelectItem>
            <SelectItem value="3">3 өрөө</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      label: 'Дулаан зогсоол',
      component: (
        <Select defaultValue="Байхгүй">
          <SelectTrigger data-testid="select-parking">
            <SelectValue placeholder="Сонгох" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Байхгүй">Байхгүй</SelectItem>
            <SelectItem value="Байгаа">Байгаа</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      label: 'Дэлгэрэнгүй тайлбар',
      component: (
        <Textarea
          className="max-h-[136px] min-h-[136px]"
          data-testid="textarea-description"
          defaultValue="Seoul Royal County хотхонд тавтай морилно уу! Зайсанд байрлах энэхүү орчин үеийн, бараг шинэ, фермерийн хэв маягтай үзэсгэлэнтэй байшин нь онцгой, дахин давтагдашгүй шийдлүүдтэй..."
        />
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl border p-6 space-y-6 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-xl font-inter">Ерөнхий мэдээлэл</h2>
        <p className="text-sm text-muted-foreground max-w-lg">
          Please tell us the name of the guest staying at the hotel as it appears on the ID that they’ll present at check-in. If the guest has more than one last name, please enter them all.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {fields.map((item, index) => (
          <div className="space-y-1" key={index}>
            <Label className="text-sm font-medium text-gray-700 leading-none">{item.label}</Label>
            {item.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralInfoSection;
