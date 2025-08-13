import * as Query from './queries';
import * as Mutation from './mutations';
import { User } from 'src/models/user.model';
import { Table } from 'src/models/table.model';
import { FoodOrder } from 'src/models/order.model';
import { FoodType } from 'src/models/food.model';
import { CategoryType } from 'src/models/category.model';

export const resolvers = {
  User: {
    userId: (parent: User) => parent._id.toString(),
  },
  Table: {
    tableId: (parent: Table) => parent._id.toString(),
  },
  FoodOrder: {
    orderId: (parent: FoodOrder) => parent._id.toString(),
  },
  Food: {
    foodId: (parent: FoodType) => parent._id.toString(),
  },
  Category: {
    categoryId: (parent: CategoryType) => parent._id.toString(),
  },
  Query,
  Mutation,
};
