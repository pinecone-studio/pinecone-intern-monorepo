import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OrderFoodCard, { Food } from "@/app/_components/OrderFoodCard";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, ...rest } = props;
    return <img src={src} alt={alt} {...rest} />;
  },
}));

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

describe("OrderFoodCard Component", () => {
  it("renders all food items correctly", () => {
    render(<OrderFoodCard foods={mockFoods} />);
    expect(screen.getByText("Үхрийн махтай шөл")).toBeInTheDocument();
    expect(screen.getByText("Гоймон")).toBeInTheDocument();
    expect(screen.findByText("/12,?900₮/")).toBeInTheDocument();
    expect(screen.findByText("/8,?900₮/")).toBeInTheDocument();
    expect(screen.getByText("5ш")).toBeInTheDocument();
    expect(screen.getByText("13ш")).toBeInTheDocument();
  });

  it("renders images with correct alt text", () => {
    render(<OrderFoodCard foods={mockFoods} />);
    expect(screen.getByAltText("Үхрийн махтай шөл")).toBeInTheDocument();
    expect(screen.getByAltText("Гоймон")).toBeInTheDocument();
  });

  it("renders correct number of food cards", () => {
    render(<OrderFoodCard foods={mockFoods} />);
    const foodImages = screen.getAllByRole("img");
    expect(foodImages).toHaveLength(mockFoods.length);
  });
});
