import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OrderFoodCardList from "@/app/_components/OrderFoodCard";

const mockFoods = [
  {
    id: 1,
    name: "Үхрийн мах",
    price: 12900,
    quantity: 12,
    imageUrl: "/images/beef-stirfry.jpg",
  },
  {
    id: 2,
    name: "Гоймон",
    price: 8900,
    quantity: 20,
    imageUrl: "/images/noodles.jpg",
  },
];

describe("OrderFoodCardList Component", () => {
  it("renders all food items", () => {
    render(<OrderFoodCardList />);
    expect(screen.getByText("Үхрийн мах")).toBeInTheDocument();
    expect(screen.getByText("Гоймон")).toBeInTheDocument();
    expect(screen.getByText("12,900₮")).toBeInTheDocument();
    expect(screen.getByText("8,900₮")).toBeInTheDocument();
    expect(screen.getByText("12ш")).toBeInTheDocument();
    expect(screen.getByText("20ш")).toBeInTheDocument();
  });

  it("renders images with correct alt text", () => {
    render(<OrderFoodCardList />);
    expect(screen.getByAltText("Үхрийн мах")).toBeInTheDocument();
    expect(screen.getByAltText("Гоймон")).toBeInTheDocument();
  });

  it("should render correct layout with multiple food cards", () => {
    render(<OrderFoodCardList />);
    const foodCards = screen.getAllByRole("img");
    expect(foodCards).toHaveLength(mockFoods.length); 
  });
});
