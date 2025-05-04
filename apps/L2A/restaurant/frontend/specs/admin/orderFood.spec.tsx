import { render, screen } from "@testing-library/react";
import OrderFood from "@/app/admin/_components/OrderFood";
import orderData from "@/app/admin/_components/orders.json";

describe("OrderFood Component", () => {
  it("renders food items from JSON correctly", () => {
    const firstOrderItems = orderData.orders[0].items;
  
    render(<OrderFood orders={firstOrderItems} />);
  
    firstOrderItems.forEach((item) => {
      expect(screen.getByText(item.name));
      expect(screen.getByText(`${item.price}₮`));
      expect(
        screen.getAllByText((text) =>
          text.replace(/\s/g, "") === `${item.quantity}ш`
        )
      );
      expect(screen.getByAltText(item.name));
    });
  });
});
  
