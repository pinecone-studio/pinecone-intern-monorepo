'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useGetProductsQuery, useDeleteProductMutation, useUpdateProductMutation } from '@/generated';
import { useState, useEffect } from 'react';

const AdminFoodList = () => {
  const { data, loading, error, refetch } = useGetProductsQuery();
  const [updateProductMutation] = useUpdateProductMutation();
  const [deleteProductMutation] = useDeleteProductMutation();
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [editForm, setEditForm] = useState<{ [key: string]: any }>({});
  const [openDialog, setOpenDialog] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (data?.getProducts) {
      setFoodItems(data.getProducts);
    }
  }, [data]);

  const handleEdit = (itemId: string, changes: any) => {
    setEditForm((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], ...changes },
    }));
  };

  const handleSave = async (itemId: string) => {
    try {
      const changes = editForm[itemId];
      if (!changes) return;

      await updateProductMutation({
        variables: {
          input: {
            _id: itemId,
            ...changes,
          },
        },
      });

      setOpenDialog((prev) => ({ ...prev, [itemId]: false }));
      await refetch();
    } catch (err) {
      console.error('Failed to update product:', err);
    }
  };

  const handleDelete = async (itemId: string) => {
    try {
      await deleteProductMutation({ variables: { input: { _id: itemId } } });
      setFoodItems((prev) => prev.filter((item) => item._id !== itemId));
      await refetch();
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div data-testid="food-list" className="max-w-md mx-auto space-y-4">
      {/* eslint-disable complexity */}
      {foodItems.map((item, index) => (
        <Card key={item._id} data-testid={`food-card-${index}`} className="flex items-center p-4">
          <Image width={87} height={87} src={item.image || '/images.jpeg'} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
          <CardContent className="flex-1 ml-4 p-0">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="font-bold">{item.price}</p>
            <p className="text-sm text-gray-500">{item.status}</p>
          </CardContent>
          <div className="flex items-center space-x-2">
            <Dialog open={openDialog[item._id] || false} onOpenChange={(isOpen) => setOpenDialog((prev) => ({ ...prev, [item._id]: isOpen }))}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setOpenDialog((prev) => ({ ...prev, [item._id]: true }))}>
                  <Pencil className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[340px] h-auto">
                <DialogHeader>
                  <DialogTitle>Хоол засах</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <Input placeholder="Хоолны нэр" value={editForm[item._id]?.name ?? item.name} onChange={(e) => handleEdit(item._id, { name: e.target.value })} />
                  <RadioGroup value={editForm[item._id]?.status ?? item.status} onValueChange={(value) => handleEdit(item._id, { status: value })} className="flex justify-around">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="active" id={`active-${index}`} />
                      <Label htmlFor={`active-${index}`}>Идэвхитэй</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="inactive" id={`inactive-${index}`} />
                      <Label htmlFor={`inactive-${index}`}>Идэвхигүй</Label>
                    </div>
                  </RadioGroup>
                  <Input placeholder="Үнэ" value={editForm[item._id]?.price ?? item.price} onChange={(e) => handleEdit(item._id, { price: e.target.value })} />
                </div>
                <DialogFooter className="pt-4">
                  <Button onClick={() => handleSave(item._id)} className="w-full">
                    Хадгалах
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="icon" onClick={() => handleDelete(item._id)}>
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AdminFoodList;
