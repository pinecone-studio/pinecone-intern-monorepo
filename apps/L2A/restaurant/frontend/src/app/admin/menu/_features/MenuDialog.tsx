'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

const MenuDialog = () => {
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!categoryName.trim()) return;

    try {
      setLoading(true);
      const res = await fetch('https://restaurant-backend-test.vercel.app/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation AddCategory($input: AddCategoryInput!) {
              addCategory(input: $input) {
                _id
                name
              }
            }
          `,
          variables: {
            input: { name: categoryName },
          },
        }),
      });

      const result = await res.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      setSuccess(true);
      setCategoryName('');
      setOpen(false);
    } catch (err: any) {
      console.error('Error adding category:', err);
      alert(`Алдаа гарлаа: ${err.message || 'Тодорхойгүй алдаа'}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }
  , [success]);

  return (
    <div className="flex items-center gap-2" data-testid="food-actions">
      <Dialog>
        <DialogTrigger asChild>
          <Button data-cy="discount-trigger" className="flex items-center text-black text-[16px] gap-2 bg-muted py-2 px-4 rounded-lg cursor-pointer hover:bg-muted/80 border">
            Хямдрал
            <Plus className="w-4 h-4 text-muted-foreground" />
          </Button>
        </DialogTrigger>
        <DialogContent data-cy="discount-dialog">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Хямдрал нэмэх</DialogTitle>
            <DialogDescription className="flex flex-col">
              <Input type="text" placeholder="Хямдралын нэр" className="w-[291px] mt-4" />
              <Input type="text" placeholder="Хямдралын хувь" className="w-[291px] mt-4" />
            </DialogDescription>
            <Button className="w-[291px]" data-cy="discount-submit">
              Нэмэх
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button data-cy="menu-trigger" className="flex items-center text-black text-[16px] gap-2 bg-muted py-2 px-4 rounded-lg cursor-pointer hover:bg-muted/80 border">
            Цэс
            <Plus className="w-4 h-4 text-muted-foreground" />
          </Button>
        </DialogTrigger>

        <DialogContent data-cy="menu-dialog">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Цэсэнд нэмэх</DialogTitle>
            <DialogDescription>
              <Input type="text" placeholder="Бүтээгдэхүүн нэмэх" className="w-[291px] mt-2 mb-3" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} data-cy="menu-input" />
            </DialogDescription>
            <Button className="w-[291px]" data-cy="menu-submit" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Нэмэгдэж байна...' : 'Нэмэх'}
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {success && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <span>Амжилттай нэмэгдлээ!</span>
        </div>
      )}
    </div>
  );
};

export default MenuDialog;