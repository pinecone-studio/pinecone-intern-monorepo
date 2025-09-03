export type DecodedProps = {
  exp: number;
  iat: number;
  user: {
    bonusPoints: number;
    createdAt: string;
    email: string;
    password: string;
    role: string;
    updatedAt: string;
    username: string;
    __v: number;
    _id: string;
  };
};
export type FoodOrderItemInput = {
  foodId: string;
  quantity: number;
};
