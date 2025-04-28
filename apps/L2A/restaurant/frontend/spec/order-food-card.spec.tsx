import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OrderFoodCard, { Food } from "@/app/_components/OrderFoodCard";

describe("OrderFoodCard", () => {
  const mockFoods: Food[] = [
    {
      id: 1,
      name: "Burger",
      price: 8000,
      quantity: 2,
      imageUrl: "/burger.jpg",
    },
    {
      id: 2,
      name: "Pizza",
      price: 12000,
      quantity: 1,
      imageUrl: "/pizza.jpg",
    },
  ];

  it("renders without crashing", () => {
    render(<OrderFoodCard foods={mockFoods} />);
    const container = screen.getByTestId("order-food-card");
    expect(container).toBeInTheDocument();
  });

  it("displays correct number of food items", () => {
    render(<OrderFoodCard foods={mockFoods} />);
    const images = screen.getAllByTestId("food-image");
    expect(images).toHaveLength(mockFoods.length);
  });

  it("displays food names, prices and quantities", () => {
    render(<OrderFoodCard foods={mockFoods} />);

    mockFoods.forEach((food) => {
      expect(screen.getByText(food.name)).toBeInTheDocument();
      expect(screen.getByText(`${food.price}₮`)).toBeInTheDocument();
      expect(screen.getByText(`${food.quantity}ш`)).toBeInTheDocument();
    });
  });
});
