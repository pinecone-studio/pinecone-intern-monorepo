import OrderFoodCard from "../_components/OrderFood";
import orders from "../_components/orders.json";

const Orders = () => {
  return <div>
    <OrderFoodCard orders={orders}  />
  </div>
};

export default Orders;
