import OrderFoodCard, { Food } from "../_components/OrderFoodCard";

const mockFoods: Food[] = [
  {
    id: 1,
    name: "Үхрийн махтай шөл",
    price: 12900,
    quantity: 5,
    imageUrl: "/images/beef-stirfry.jpg",
  },
  {
    id: 2,
    name: "Гоймон",
    price: 8900,
    quantity: 13,
    imageUrl: "/images/noodles.jpg",
  },
]; 

const AdminBody=()=>{
    
    return(
        <div>
            <OrderFoodCard foods={mockFoods} />
        </div>
    )
}
export default AdminBody