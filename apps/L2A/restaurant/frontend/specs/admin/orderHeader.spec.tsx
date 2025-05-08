import { render, screen } from "@testing-library/react";
import OrderHeader from "@/app/admin/_components/OrderHeader";

describe("OrderHeader Component", () => {
  it("renders initial buttons", () => {
    render(<OrderHeader />);

    expect(screen.getByText("Захиалга"));
    expect(screen.getByText("Өнөөдөр"));
    expect(screen.getByText("Төлөв"));
  });
});
