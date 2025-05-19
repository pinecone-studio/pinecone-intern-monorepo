
import FoodCard from "./_features/FoodCard";
import menuCategories from "./_components/menuCategories.json";
import MenuCard from "./_features/MenuCard";

const Menu = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <MenuCard />
      {menuCategories.map((category) =>
        category.foods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))
      )}

    </div>
  );
};

export default Menu;