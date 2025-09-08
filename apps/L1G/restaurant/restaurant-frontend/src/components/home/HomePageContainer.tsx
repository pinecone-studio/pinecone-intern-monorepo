'use client';
import { useEffect, useState } from 'react';
import MenuCard from './MenuCard';
import { useGetCategoriesQuery } from '@/generated';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import OrderList from './OrderList';
import OrderType from './OrderType';
import { usePathname } from 'next/navigation';
import { AddPayload, CartItem } from '@/types/cart';
import { loadCart, saveCart } from '@/utils/storage';
typeof window !== 'undefined' && localStorage.removeItem('foodData');

export function removeItemReducer(prev: CartItem[], id: string): CartItem[] {
  const norm = (v: string) => String(v).trim();
  const target = norm(id);
  const next = prev.filter((x) => norm(x.id) !== target);
  return next;
}
export function addToCartReducer(prev: CartItem[], p: AddPayload): CartItem[] {
  const idx = prev.findIndex((x) => x.id === p.id);
  if (idx >= 0) {
    const next = prev.slice();
    next[idx] = { ...next[idx], selectCount: next[idx].selectCount + 1 };
    return next;
  }
  return [...prev, { ...p, selectCount: 1 }];
}
export function removeOneReducer(prev: CartItem[], id: string): CartItem[] {
  const idx = prev.findIndex((x) => x.id === id);
  if (idx < 0) return prev;
  const next = prev.slice();
  const n = next[idx].selectCount - 1;
  if (n <= 0) next.splice(idx, 1);
  else next[idx] = { ...next[idx], selectCount: n };
  return next;
}

const HomePageContainer = () => {
  const { data: categoriesData } = useGetCategoriesQuery();
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    setCart(loadCart());
  }, []);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  useEffect(() => {
    if (categoriesData?.getCategories?.length) {
      setActiveCategory(categoriesData.getCategories[0]?.categoryName);
    }
  }, [categoriesData]);

  const filteredItems = categoriesData?.getCategories.find((item) => item?.categoryName === activeCategory)?.food ?? [];

  const addToCart = (id: string, image: string, foodName: string, price: string) => {
    setCart((prev) => addToCartReducer(prev, { id, image, foodName, price }));
  };
  const removeOne = (id: string) => setCart((prev) => removeOneReducer(prev, id));
  const removeItem = (id: string) => setCart((prev) => removeItemReducer(prev, id));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col w-full h-fit sticky top-[55px] z-10">
        <div className="bg-white px-4 py-6 text-center border-b">
          <h1 className="text-2xl font-bold text-gray-800">Хоолны цэс</h1>
        </div>

        <div className="bg-white px-4 py-4 border-b">
          <div className="flex space-x-6 overflow-x-auto">
            {categoriesData?.getCategories.map((category) => (
              <button
                data-testid={`homepage-container-filter-button-${category?.categoryName || 'empty'}`}
                key={category?.categoryId}
                onClick={() => {
                  const name = category?.categoryName?.trim();
                  if (name) setActiveCategory(name);
                }}
                className={`whitespace-nowrap text-sm font-medium pb-2 border-b-2 transition-colors ${
                  activeCategory === category?.categoryName ? 'text-orange-600 border-orange-600' : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {category?.categoryName}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4  pb-[93px]">
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto overflow-scroll h-fit ">
          {filteredItems.map((value) => {
            const count = cart.find((c) => c.id === value?.foodId)?.selectCount ?? 0;
            return (
              <MenuCard
                key={value?.foodId}
                image={value!.image}
                foodName={value!.foodName}
                price={value!.price}
                id={value!.foodId}
                onAdd={addToCart}
                count={count}
                onRemove={removeItem}
                discount={value?.discount}
              />
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Drawer data-testid="drawer-content" open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger className="w-full bg-amber-800 hover:bg-amber-900 text-white py-4 text-lg font-medium rounded-lg" onClick={() => setDrawerOpen(true)}>
            Захиалах
          </DrawerTrigger>

          <DrawerContent data-testid="drawer-content">
            <DrawerHeader>
              <DrawerTitle>Таны захиалга</DrawerTitle>
            </DrawerHeader>

            {cart.length === 0 ? (
              <div className="py-10 text-center text-sm text-zinc-500">Хоосон байна.</div>
            ) : (
              cart.map((item: CartItem, index: number) => (
                <OrderList
                  key={index}
                  onAdd={addToCart}
                  id={item.id}
                  image={item.image}
                  foodName={item.foodName}
                  price={item.price}
                  count={item.selectCount}
                  onRemove={removeOne}
                  removeItem={removeItem}
                />
              ))
            )}

            <DrawerFooter>{cart.length !== 0 && <OrderType currentCart={cart} />}</DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      {}
    </div>
  );
};
export default HomePageContainer;
