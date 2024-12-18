'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const RequestForm = () => {
  return (
    <Card className="w-[608px] border-[#E4E4E7] mx-auto">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-1">Чөлөөний хүсэлт</h2>
            <p className="text-sm font-normal text-muted-foreground">Ажлын цагаар оффис дээр байх боломжгүй болсон аль ч тохиолдолд тус формыг заавал бөглөнө.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-medium text-sm">Ангилал*</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Сонгоно уу" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Чөлөө">Чөлөө</SelectItem>
                  <SelectItem value="Цалинтай чөлөө">Цалинтай чөлөө</SelectItem>
                  <SelectItem value="Зайнаас ажиллах">Зайнаас ажиллах</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-4">
              <div className="flex justify-end items-center text-sm">
                <span className="text-muted-foreground text-xs font-normal">Боломжит хугацаа: </span>
                <span className="text-xs"> - хоног</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestForm;
