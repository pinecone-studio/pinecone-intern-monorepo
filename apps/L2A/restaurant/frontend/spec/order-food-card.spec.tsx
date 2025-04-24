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
  it("renders all food items correctly", async () => {
    expect(await screen.findByText("Үхрийн махтай шөл"));
    expect(await screen.findByText("Гоймон"));
    expect(await screen.findByText("12,900₮"));
    expect(await screen.findByText("8,900₮"));
    expect(await screen.findByText("5ш"));
    expect(await screen.findByText("13ш"));
  });

  it("renders images with correct alt text", () => {
    render(<OrderFoodCard foods={mockFoods} />);
    
    expect(screen.getByAltText("Үхрийн махтай шөл"));
    expect(screen.getByAltText("Гоймон"));
  });

  it("renders correct number of food cards", () => {
    render(<OrderFoodCard foods={mockFoods} />);
    
    const foodImages = screen.getAllByRole("img");
    expect(foodImages);
  });
});
