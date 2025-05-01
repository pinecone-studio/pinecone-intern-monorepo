import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import AdminFoodList from '@/app/admin/food/_features/AdminFoodList';

describe("AdminFoodList", () => {
  it("renders the food list container", () => {
    expect.assertions(1);
    render(<AdminFoodList />);
    const list = screen.getByTestId("food-list");
    expect(list).toBeInTheDocument();
  });

  it("renders 2 food cards", () => {
    expect.assertions(1);
    render(<AdminFoodList />);
    const cards = screen.getAllByTestId(/food-card-/);
    expect(cards).toHaveLength(2);
  });

  it("renders each food card content correctly", () => {
    expect.assertions(6);
    render(<AdminFoodList />);
    for (let i = 0; i < 2; i++) {
      expect(screen.getByTestId(`food-name-${i}`)).toHaveTextContent("Apple");
      expect(screen.getByTestId(`food-price-${i}`)).toHaveTextContent("15.6k");
      expect(screen.getByTestId(`food-description-${i}`)).toHaveTextContent("Идэвхитэй");
    }
  });

  it("renders edit and delete buttons for each card", () => {
    expect.assertions(4);
    render(<AdminFoodList />);
    for (let i = 0; i < 2; i++) {
      expect(screen.getByTestId(`edit-button-${i}`)).toBeInTheDocument();
      expect(screen.getByTestId(`delete-button-${i}`)).toBeInTheDocument();
    }
  });

  it("renders image with correct alt for each card", () => {
    expect.assertions(2);
    render(<AdminFoodList />);
    for (let i = 0; i < 2; i++) {
      const img = screen.getByTestId(`food-image-${i}`);
      expect(img).toHaveAttribute("alt", "Apple");
    }
  });
});
