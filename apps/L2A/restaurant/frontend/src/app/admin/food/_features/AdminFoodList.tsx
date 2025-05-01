import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import Image from 'next/image';

const AdminFoodList = () => {
  const foodItems = Array(2).fill({
    name: 'Apple',
    price: '15.6k',
    description: 'Идэвхитэй',
    image: '/apple.png',
  });
  return (
    <div data-testid="food-list" className="max-w-md mx-auto space-y-4">
      {foodItems.map((item, index) => (
        <Card key={index} data-testid={`food-card-${index}`} className="flex items-center p-4">
          <Image width={87} height={87} src={item.image} alt={item.name} data-testid={`food-image-${index}`} className="w-20 h-20 rounded-lg object-cover" />
          <CardContent data-testid={`food-content-${index}`} className="flex-1 ml-4 p-0">
            <h3 data-testid={`food-name-${index}`} className="font-semibold">
              {item.name}
            </h3>
            <p data-testid={`food-price-${index}`} className="font-bold">
              {item.price}
            </p>
            <p data-testid={`food-description-${index}`} className="text-sm text-gray-500">
              {item.description}
            </p>
          </CardContent>
          <div data-testid={`food-actions-${index}`} className="flex items-center">
            <Button variant="outline" size="icon" data-testid={`edit-button-${index}`}>
              <Pencil className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" data-testid={`delete-button-${index}`}>
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
export default AdminFoodList;
