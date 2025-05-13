'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const AdminFoodList = () => {
  const foodItems = Array.from({ length: 2 }, () => ({
    id: Math.random().toString(36).substr(2, 9),
    name: 'Apple',
    price: '15.6k',
    status: 'active',
    image: '/apple.png',
    previewImage: '/apple.png',
  }));
  const handleEdit = (itemId: string, changes: unknown) => {
    console.log('Edit:', itemId, changes);
  };
  const handleDelete = (itemId: string) => {
    console.log('Delete:', itemId);
  };
  return (
    <div data-testid="food-list" className="max-w-md mx-auto space-y-4">
      {foodItems.map((item, index) => (
        <Card key={item.id} data-testid={`food-card-${index}`} className="flex items-center p-4">
          <Image width={87} height={87} src={item.image} alt={item.name} data-testid={`food-image-${index}`} className="w-20 h-20 rounded-lg object-cover" />
          <CardContent data-testid={`food-content-${index}`} className="flex-1 ml-4 p-0">
            <h3 data-testid={`food-name-${index}`} className="font-semibold">
              {item.name}
            </h3>
            <p data-testid={`food-price-${index}`} className="font-bold">
              {item.price}
            </p>
            <p data-testid={`food-description-${index}`} className="text-sm text-gray-500">
              {item.status === 'active'}
            </p>
          </CardContent>
          <div data-testid={`food-actions-${index}`} className="flex items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" data-testid={`edit-button-${index}`}>
                  <Pencil className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[340px] h-auto" data-testid="food-dialog">
                <DialogHeader>
                  <DialogTitle data-testid="dialog-title">Хоол засах</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <Input placeholder="Хоолны нэр" defaultValue={item.name} onChange={(e) => handleEdit(item.id, { name: e.target.value })} data-testid="food-name-input" />
                  <RadioGroup defaultValue={item.status} onValueChange={(value) => handleEdit(item.id, { status: value })} className="flex justify-around" data-testid="status-radio-group">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="active" id={`active-${index}`} data-testid="active-radio" />
                      <Label htmlFor={`active-${index}`} data-testid="active-label">
                        Идэвхитэй
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="inactive" id={`inactive-${index}`} data-testid="inactive-radio" />
                      <Label htmlFor={`inactive-${index}`} data-testid="inactive-label">
                        Идэвхигүй
                      </Label>
                    </div>
                  </RadioGroup>
                  <Input placeholder="Үнэ" defaultValue={item.price} onChange={(e) => handleEdit(item.id, { price: e.target.value })} data-testid="price-input" />
                </div>
                <DialogFooter className="pt-4">
                  <Button className="w-full" onClick={() => handleEdit(item.id, { submit: true })} data-testid="edit-food-button">
                    Хадгалах
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="icon" data-testid={`delete-button-${index}`} onClick={() => handleDelete(item.id)}>
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
export default AdminFoodList;
