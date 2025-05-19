import { render, screen, fireEvent, } from "@testing-library/react";
import OrderHeader from "@/app/admin/order/_features/OrderHeader";
import "@testing-library/jest-dom";


jest.mock("date-fns", () => ({
  ...jest.requireActual("date-fns"),
  format: () => "Өнөөдөр",
}));

describe("OrderHeader", () => {
   it("opens date picker calendar", () => {
    render(<OrderHeader />);
   fireEvent.click(screen.getByTestId("status-picker-trigger"))
   fireEvent.click(screen.getByTestId("status-option-ready"))
  });


});