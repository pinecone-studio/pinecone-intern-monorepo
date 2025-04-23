import { render, screen, fireEvent } from "@testing-library/react";
import { OrderHeader } from "@/app/admin/_features/OrderHeader";
import "@testing-library/jest-dom";

jest.mock("date-fns", () => {
  const actual = jest.requireActual<typeof import("date-fns")>("date-fns");
  return {
    ...actual,
    format: (date: Date) => date.toISOString().split("T")[0],
  };
});

describe("OrderHeader component", () => {
  it("renders the title and initial buttons", async () => {
    render(<OrderHeader />);
    expect(await screen.findByText("Захиалга")).toBeInTheDocument();
    expect(await screen.findByText("Өнөөдөр")).toBeInTheDocument();
  });

  it("opens the calendar popover when clicking the date button", () => {
    render(<OrderHeader />);
    fireEvent.click(screen.getByText("Өнөөдөр"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
