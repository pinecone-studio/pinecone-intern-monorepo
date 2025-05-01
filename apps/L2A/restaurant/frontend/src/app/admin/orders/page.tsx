import OrderFoodCard from "../_components/OrderFoodCard";
import orders from "../_components/orders.json";

const Orders = () => {
  return <div>
    <OrderFoodCard orders={orders}  />
  </div>
};

export default Orders;
