export type AddPayload = {
  id: string;
  image: string;
  foodName: string;
  price: string;
};

export type CartItem = {
  id: string;
  image: string;
  foodName: string;
  price: string;
  selectCount: number;
};
