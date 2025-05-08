import { render, screen, fireEvent } from "@testing-library/react";
import OrderHeader from "@/app/admin/_components/OrderHeader";
import "@testing-library/jest-dom";

jest.mock("date-fns", () => ({
  ...jest.requireActual("date-fns"),
  format: () => "Өнөөдөр",
}));

describe("OrderHeader", () => {
  it("renders title and buttons", () => {
    render(<OrderHeader />);
    expect(screen.getByText("Захиалга")).toBeVisible();
    expect(screen.getByText("Өнөөдөр")).toBeVisible();
    expect(screen.getByText("Төлөв")).toBeVisible();
  });
  
  it("opens date picker calendar", () => {
    render(<OrderHeader />);
    fireEvent.click(screen.getByText("Өнөөдөр"));
    expect(screen.getByRole("dialog")).toBeVisible(); 
  });
});